import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});
  const toggleAuth = (data) => {
    if (data) {
      setAdminDetails(data);
      setAuth(true);
      
    } else {
      setAuth(false);
    }
  };
  const value = { isAuth, toggleAuth, adminDetails };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
