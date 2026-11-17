import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';

function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Routes>
        {/* Public marketing site */}
        <Route
          path="/"
          element={
            <SiteLayout>
              <Home />
            </SiteLayout>
          }
        />

        {/* Admin login (also serves /admin) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <SiteLayout>
              <NotFound />
            </SiteLayout>
          }
        />
      </Routes>
    </>
  );
}
