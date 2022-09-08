import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

export const Navigation = () => {
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogoutFunc = () => {
    authContext.handleLogout();
    navigate("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Link className="navbar-brand" to={"/"}>
          Study Planner Inc.
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!authContext.isLoggedIn && (
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            )}
            {!authContext.isLoggedIn && (
              <Link className="nav-link" to={"/signup"}>
                SignUp
              </Link>
            )}
            {authContext.isLoggedIn && (
              <Link className="nav-link" to={"/createSession"}>
                Create Session
              </Link>
            )}
            {authContext.isLoggedIn && (
              <Link className="nav-link" to={"/upcomingSession"}>
                Upcoming Session
              </Link>
            )}
            {authContext.isLoggedIn && (
              <NavLink
                className={({ isActive }) =>
                  ["nav-link", isActive ? "active" : "not-active"]
                    .filter(Boolean)
                    .join(" ")
                }
                variant="link"
                onClick={handleLogoutFunc}
              >
                Logout
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
