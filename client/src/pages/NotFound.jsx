import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-charcoal px-6 text-center text-cream">
      <div>
        <p className="font-mono text-7xl font-extrabold text-burnt md:text-9xl">404</p>
        <h1 className="display-heading mt-4 text-3xl md:text-4xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-cream/60">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" /> Back Home
        </Link>
      </div>
    </section>
  );
}
