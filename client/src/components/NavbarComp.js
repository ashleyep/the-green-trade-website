import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  const handleSelect = (category) => {
    const queryParam = category === "All Posts" ? "" : `?category=${encodeURIComponent(category)}`;
    navigate(`/posts${queryParam}`);
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
                  {["All Posts", "Shirts", "Pants", "Shorts", "Shoes", "Sweaters", "Jackets", "Skirts", "Dresses", "Accessories"].map(cat => (
        <NavDropdown.Item key={cat} onClick={() => handleSelect(cat)}>
          {cat}
        </NavDropdown.Item>
      ))}
                  </NavDropdown>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/matches">
                  <Nav.Link>Matches</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={isAuth ? handleLogout : null}>
                  {isAuth ? "Logout" : ""}
                </Nav.Link>
              </>
            )}
              {!isAuth && (
              <>
              <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                {/* <Nav.Link onClick={!isAuth ? handleLogout : null}>
                 
                </Nav.Link> */}
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
