import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import "../styles/NavbarComp.css";
import WebsiteTitle from "../assets/title.png";
import Logo from "../assets/newLogo.png";
import { LinkContainer } from "react-router-bootstrap";
import { signOut } from "firebase/auth"; // Make sure to import the signOut function from Firebase
import { auth } from "../firebase-config";

const NavbarComp = () => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false); // Set to false after signing out
        window.location.pathname = "the-green-trade-website/login";
      })
      .catch((error) => {
        console.log("Error occurred during logout:", error);
      });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/the-green-trade-website">
          <img src={Logo} className="d-inline-block align-top smaller-title" />
          <div className="d-inline-block align-top smaller-title">
            THE GREEN TRADE
          </div>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {isAuth && ( // Only render these links if isAuth is true
              <>
                <LinkContainer to="/createPost">
                  <Nav.Link>Create Post</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Matching">
                  <Nav.Link>Find Clothes!</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/posts">
                  <NavDropdown title="Posts" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/posts">
                      All Posts
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">Tops</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">
                      Bottoms
                    </NavDropdown.Item>
                  </NavDropdown>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={isAuth ? handleLogout : null}>
                  {isAuth ? "Logout" : ""}
                </Nav.Link>
              </>
            )}
              {!isAuth && (
              <>
                <Nav.Link onClick={!isAuth ? handleLogout : null}>
                  {!isAuth ? "Login" : ""}
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
