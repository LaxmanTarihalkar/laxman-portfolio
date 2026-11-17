import About from '../models/About.js';
import { sendSuccess } from '../utils/apiResponse.js';

/** GET /api/about — public. Returns the single About document. */
export async function getAbout(req, res, next) {
  try {
    let about = await About.findOne();
    // If not seeded yet return an empty shape so the frontend never 404s.
    if (!about) about = { paragraphs: [], facts: [], profileImage: '/images/Laxman-Tarihalkar-img.png' };
    return sendSuccess(res, { about }, 'About fetched');
  } catch (err) {
    next(err);
  }
}

/** PUT /api/about — admin only. Upsert the single About document. */
export async function updateAbout(req, res, next) {
  try {
    const { paragraphs, facts, profileImage } = req.body;

    const about = await About.findOneAndUpdate(
      {},
      {
        ...(paragraphs !== undefined && { paragraphs }),
        ...(facts !== undefined && { facts }),
        ...(profileImage !== undefined && { profileImage }),
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return sendSuccess(res, { about }, 'About updated');
  } catch (err) {
    next(err);
  }
}
