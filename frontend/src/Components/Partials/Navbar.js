import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Planty</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link href="#home" className="mx-1">Home</Nav.Link>
            <Nav.Link href="#service" className="mx-1">Service</Nav.Link>
            <Nav.Link href="#matching"className="mx-1">Matching</Nav.Link>
            <Nav.Link href="#more"className="mx-1">More</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default NavigationBar;