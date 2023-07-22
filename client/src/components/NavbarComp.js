import React, { Component } from "react";
import{Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap'
import "../styles/NavbarComp.css";
import WebsiteTitle from "../assets/title.png";
import Logo from "../assets/logo.png"
import { LinkContainer } from "react-router-bootstrap";

export default class NavbarComp extends Component {
  render() {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={WebsiteTitle}
              //   width="70"
              //   height="30"
              className="d-inline-block align-top smaller-title"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/posts">
                <NavDropdown title="Posts" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/contact">
                    All Posts
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Tops</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Bottoms</NavDropdown.Item>
                </NavDropdown>
              </LinkContainer>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
