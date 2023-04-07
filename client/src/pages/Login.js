import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Login = () => {
  const [showPage, setShowPage] = useState("login");

  const renderPage = () => {
    if (showPage === "login") {
      return <LoginForm />;
    }
    return <SignupForm />;
  };
  const handlePageChange = (page) => setShowPage(page);

  return (
    <>
      <Container>
        <Button onClick={() => handlePageChange("login")}>Login</Button>
        <Button onClick={() => handlePageChange("signup")}>Signup</Button>
        {renderPage()}
      </Container>
    </>
  );
};

export default Login;
