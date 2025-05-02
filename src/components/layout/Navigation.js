// src/components/layout/Navigation.js
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = ({ activePage, setActivePage }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => setActivePage('dashboard')} style={{ cursor: 'pointer' }}>
          Market Trends AI Assistant
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              onClick={() => setActivePage('dashboard')} 
              active={activePage === 'dashboard'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActivePage('watchlist')} 
              active={activePage === 'watchlist'}
            >
              Watchlist
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActivePage('news')} 
              active={activePage === 'news'}
            >
              News
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActivePage('insights')} 
              active={activePage === 'insights'}
            >
              AI Insights
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActivePage('learn')} 
              active={activePage === 'learn'}
            >
              Learn
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;