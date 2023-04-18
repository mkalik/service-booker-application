

import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/favicon.png"
import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useUserContext } from "../utils/UserContext";


const Header = () => {

  const {user, changeUserState} =useUserContext();
  console.log(user)
  console.log(Auth.getToken())
  console.log(Auth.loggedIn())
if (Auth.loggedIn()) {
  changeUserState(true)
}

  console.log(user)

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
            src={logo}
            width={"30"}
            height={"30"}
            />
            The Service Booker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {user ? (
                <>
                  <Nav.Link as={Link} to="/me">
                    My Profile
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

};

export default Header;
