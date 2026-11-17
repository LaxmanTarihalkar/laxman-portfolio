import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Guards admin routes. While the session is being verified it shows a loader;
 * if there's no authenticated admin it redirects to /admin (the login page).
 */
export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-charcoal text-cream/60">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream/20 border-t-burnt" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}
