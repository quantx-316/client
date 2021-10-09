import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const ComposedNavbar: React.FC = () => (
  <Navbar 
    className="navbar-dark bg-black"
  >
    <Container>
      <div> 
        <Navbar.Brand href="#home">
          QuantX
        </Navbar.Brand>
      </div>

      <div
        style={{display: "flex", justifyContent: "space-between"}}
      >
        <Nav className="me-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Tutorials</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login">John Doe</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
)

export default ComposedNavbar;