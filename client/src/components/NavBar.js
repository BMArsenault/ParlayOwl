import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import React from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const AppNavbar = () => {
  return (
    <>
      <header className="navbar header flex-row align-center">
        <div className="container flex-row justify-center align-center">
          <Link to="/" className="nav-text">
            <h1>Parlay Owl 🦉</h1>
          </Link>
          <nav aria-controls="navbar" />
          <div id="navbar">
            <div className="ml-auto flex-row">
              {/* if user is logged in show stripe and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Link to="/saved">Place Bet</Link>
                  <Link onClick={Auth.logout}>
                    <p>Logout</p>
                  </Link>
                </>
              ) : (
                <Link to="/Login">
                  <p className="nav-text">Login</p>
                </Link>
              )}
              <div className="ml-auto flex-row ">
                <Link to="/Signup">
                  <p className="nav-text">Sign up</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppNavbar;
