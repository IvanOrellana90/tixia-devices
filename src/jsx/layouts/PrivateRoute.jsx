import { Navigate, Outlet } from 'react-router-dom'; // Importamos Navigate
import { useAuth } from '../../context/AuthContext';

// 1. Agregamos 'children' a los props
const PrivateRoute = ({ allowedRoles = [], children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // 2. Si no hay usuario, redirigimos inmediatamente (Return temprano)
  if (!user) {
    return <Navigate to="/page-login" replace />;
  }

  // 3. Si hay roles definidos y el usuario no tiene permiso
  if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    return <Navigate to="/page-error-503" replace />;
  }

  // 4. Si pasa las validaciones, renderiza children (si existe) u Outlet
  return children ? children : <Outlet />;
};

export default PrivateRoute;