/**
 * End-to-end API smoke test. Exercises public and protected endpoints,
 * authentication, the cookie flow, contact submission, and admin CRUD.
 * Run while the server is up: node scripts/test-api.js
 */
const BASE = 'http://localhost:5000';

let pass = 0;
let fail = 0;
function check(name, ok, detail = '') {
  if (ok) {
    pass++;
    console.log(`  PASS  ${name}`);
  } else {
    fail++;
    console.log(`  FAIL  ${name} ${detail}`);
  }
}

async function main() {
  // ---- Health ----
  try {
    const r = await fetch(`${BASE}/api/health`);
    const j = await r.json();
    check('GET /api/health → 200 ok', r.status === 200 && j.success === true);
  } catch (e) {
    check('GET /api/health', false, e.message);
  }

  // ---- Public projects ----
  try {
    const r = await fetch(`${BASE}/api/projects`);
    const j = await r.json();
    check(
      'GET /api/projects → returns 3 seeded projects',
      j.success === true && j.data?.projects?.length === 3,
      `got ${j.data?.projects?.length}`
    );
    check(
      'Projects include RentRide',
      j.data?.projects?.some((p) => p.slug === 'rentride')
    );
  } catch (e) {
    check('GET /api/projects', false, e.message);
  }

  // ---- Protected route without auth should 401 ----
  try {
    const r = await fetch(`${BASE}/api/contact`);
    check('GET /api/contact without auth → 401', r.status === 401);
  } catch (e) {
    check('GET /api/contact without auth', false, e.message);
  }

  // ---- Submit contact message (public) ----
  try {
    const r = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'API Test',
        message: 'This is an automated test message.',
      }),
    });
    const j = await r.json();
    check('POST /api/contact → 201 created', r.status === 201 && j.success === true);
  } catch (e) {
    check('POST /api/contact', false, e.message);
  }

  // ---- Contact validation (bad email) ----
  try {
    const r = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: 'not-an-email',
        subject: '',
        message: '',
      }),
    });
    const j = await r.json();
    check(
      'POST /api/contact bad input → 422 validation',
      r.status === 422 && j.details && Object.keys(j.details).length === 4,
      `status ${r.status}`
    );
  } catch (e) {
    check('POST /api/contact validation', false, e.message);
  }

  // ---- Admin login + cookie capture ----
  const cookieRes = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'laxmantarihalkar05@gmail.com',
      password: 'TempAdmin2026!',
    }),
  });
  const loginJson = await cookieRes.json();
  const setCookie = cookieRes.headers.get('set-cookie') || '';
  check('POST /api/auth/login → 200 success', cookieRes.status === 200 && loginJson.success === true);
  check('Login sets HTTP-only cookie', /token=/.test(setCookie) && /httponly/i.test(setCookie));

  const tokenCookie = setCookie.split(';')[0]; // "token=..."

  // ---- /api/auth/me with cookie ----
  try {
    const r = await fetch(`${BASE}/api/auth/me`, {
      headers: { Cookie: tokenCookie },
    });
    const j = await r.json();
    check(
      'GET /api/auth/me with cookie → returns admin',
      r.status === 200 && j.data?.admin?.email === 'laxmantarihalkar05@gmail.com'
    );
  } catch (e) {
    check('GET /api/auth/me with cookie', false, e.message);
  }

  // ---- Login with wrong password → 401 ----
  try {
    const r = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'laxmantarihalkar05@gmail.com',
        password: 'wrong-password',
      }),
    });
    check('POST /api/auth/login wrong password → 401', r.status === 401);
  } catch (e) {
    check('login wrong password', false, e.message);
  }

  // ---- GET /api/contact with auth → messages ----
  try {
    const r = await fetch(`${BASE}/api/contact`, {
      headers: { Cookie: tokenCookie },
    });
    const j = await r.json();
    check(
      'GET /api/contact with auth → messages list',
      r.status === 200 && j.data?.messages?.length >= 1
    );
    check(
      'Contact message status is unread',
      j.data?.messages?.some((m) => m.status === 'unread')
    );
  } catch (e) {
    check('GET /api/contact with auth', false, e.message);
  }

  // ---- Admin project CRUD ----
  let createdId;
  try {
    const r = await fetch(`${BASE}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tokenCookie },
      body: JSON.stringify({
        title: 'Test Project',
        slug: 'test-project',
        description: 'Created by the API test script.',
        technologies: ['React', 'Node'],
        featured: false,
        displayOrder: 99,
      }),
    });
    const j = await r.json();
    createdId = j.data?.project?._id;
    check('POST /api/projects with auth → 201', r.status === 201 && !!createdId);
  } catch (e) {
    check('POST /api/projects with auth', false, e.message);
  }

  // Update it
  if (createdId) {
    try {
      const r = await fetch(`${BASE}/api/projects/${createdId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Cookie: tokenCookie },
        body: JSON.stringify({ title: 'Updated Test Project', slug: 'test-project', description: 'Updated.', technologies: ['React'], featured: true }),
      });
      const j = await r.json();
      check(
        'PUT /api/projects/:id → updates title',
        r.status === 200 && j.data?.project?.title === 'Updated Test Project'
      );
    } catch (e) {
      check('PUT /api/projects/:id', false, e.message);
    }

    // Delete it
    try {
      const r = await fetch(`${BASE}/api/projects/${createdId}`, {
        method: 'DELETE',
        headers: { Cookie: tokenCookie },
      });
      check('DELETE /api/projects/:id → 200', r.status === 200);
    } catch (e) {
      check('DELETE /api/projects/:id', false, e.message);
    }
  }

  // ---- Logout clears cookie ----
  try {
    const r = await fetch(`${BASE}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: tokenCookie },
    });
    check('POST /api/auth/logout → 200', r.status === 200);
  } catch (e) {
    check('POST /api/auth/logout', false, e.message);
  }

  console.log(`\nResults: ${pass} passed, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('Test harness crashed:', e);
  process.exit(1);
});
