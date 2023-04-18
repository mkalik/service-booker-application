import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/favicon.png';

import Auth from '../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    console.log(Auth.loggedIn());
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} width={'30'} height={'30'} />
                        The Service Booker
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="ml-auto">
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to="/me">
                                        My Profile
                                    </Nav.Link>
                                    <Nav.Link onClick={Auth.logout}>
                                        Logout
                                    </Nav.Link>
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
