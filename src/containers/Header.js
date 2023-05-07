import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/auth";
const Header = (props) => {
  const userInfo = useSelector((state)=> state.auth.userInfo)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img
              src={`${process.env.PUBLIC_URL}/img/graduate.png`}
              alt=""
              style={{ height: "25px" }}
              className="me-1"
            />
            Student Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/major">
                Major
              </Nav.Link>
              <Nav.Link as={NavLink} to="/student">
                Student
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/#">
                Welcom to ... {userInfo.fullName}
              </Nav.Link>
              <Nav.Link onClick={() => dispatch(logout())}>
                <i className="bi-box-arrow-right"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
