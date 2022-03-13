import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="navbar header flex-row align-center" expand='lg'>
        <div className="container flex-row justify-center align-center" fluid>
          <Link to='/' className="title">
            <h1>Parlay Owl  🦉</h1>
          </Link>
          <nav aria-controls='navbar' />
            <div id='navbar'>
              <div className='ml-auto'>
              {/* if user is logged in show stripe and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Link to='/saved'>
                    Place Bet
                  </Link>
                  <Link onClick={Auth.logout}>Logout</Link>
                </>
              ) : (
                <Link to='/Login'>
                  <p className="nav-text">Login</p>
                </Link>
              )}
                <Link to='/Signup'>
                  <p>Sign up</p>
                </Link>
            </div>
          </div>
        </div>
      </header>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;