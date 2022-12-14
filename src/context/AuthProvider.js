import React from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = (token, uId, emailID) => {
    localStorage.setItem("token", token);
    localStorage.setItem('isLoggedIn','1');
    localStorage.setItem('userID',uId);
    localStorage.setItem('email',emailID);
    setIsLoggedIn(true);
  };
  const handleLogout = React.useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userID');
    localStorage.removeItem('email');
  },[]);

  const authValue = {
    isLoggedIn,
    handleLogout,
    handleLogin,
  };
  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
