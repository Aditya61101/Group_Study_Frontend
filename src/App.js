import React from "react";
import { Navigation } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { CreateSession } from "./pages/CreateSession";
import { UpcomingSessions } from "./pages/UpcomingSessions";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";

const App = () => {
  const authContext = React.useContext(AuthContext);
  return (
    <div>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {!authContext.isLoggedIn && (
            <Route path="/login" element={<Login />} />
          )}
          {!authContext.isLoggedIn && (
            <Route path="/signup" element={<Signup />} />
          )}
          {authContext.isLoggedIn && (
            <Route path="/createSession" element={<CreateSession />} />
          )}
          {authContext.isLoggedIn && (
            <Route path="/upcomingSession" element={<UpcomingSessions />} />
          )}
        </Routes>
      </main>
    </div>
  );
};
export default App;
