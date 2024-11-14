import { useLocation, Navigate } from "react-router-dom";

export const Protected = async({ isLoggedIn,path, children }) => {
    const location = useLocation();

  if (isLoggedIn === null || isLoggedIn === undefined || !location.pathname.startsWith(path)) {
    return <Navigate to="/" replace />;
  }
  return children;
  };
