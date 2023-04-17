import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useUserContext } from "../utils/UserContext";

const styles = {
  button: {
    marginTop: 15,
    marginRight: 15,
    marginBottom: 15,
  },
};

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
        <Button onClick={() => handlePageChange("login")} style={styles.button}>Login</Button>
        <Button onClick={() => handlePageChange("signup")} style={styles.button}>Signup</Button>
        {renderPage()}
      </Container>
    </>
  );
};

export default Login;
