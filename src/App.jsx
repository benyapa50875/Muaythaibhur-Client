import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import publicRoutes from './routes/publicRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import TopBar from './components/admin/Topbar';
import Navbar from './components/user/NavBar';
import HelmetComp from './pages/admin/Helmet'
import Footer from './components/Footer'
import { UserRoute, AdminRoute } from './routes/RouteGuard';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin'); // Check based on current route path
  return (
    <>
          {isAdmin ? <TopBar /> : <Navbar />}
          <HelmetComp />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* User Routes */}
          {userRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <UserRoute>
                  {route.element}
                </UserRoute>
              }
            />
          ))}

          {/* Admin Routes */}
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminRoute>
                  {route.element}
                </AdminRoute>
              }
            />
          ))}
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;