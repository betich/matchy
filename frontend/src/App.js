import axios from 'axios';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav} from 'react-bootstrap';

import { FaGoogle, FaFacebookF, FaLine, FaApple } from 'react-icons/fa';

class Something extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      text: ''
    }
    this.getBackend = this.getBackend.bind(this);
  }

  getBackend() {
    axios.get('/api')
      .then((res) => {
        this.setState({ text: res.data.msg });
      })
  }

  render() {
    return (
      <>
        <pre>{this.state.text}</pre>
        <Button variant="outline-danger" onClick={this.getBackend} type="submit">
          <FaGoogle size={28} />
        </Button>
        <Button variant="outline-primary" onClick={this.getBackend} type="submit">
          <FaFacebookF size={28} />
        </Button>
        <Button variant="outline-success" onClick={this.getBackend} type="submit">
          <FaLine size={28} />
        </Button>
        <Button variant="outline-secondary" onClick={this.getBackend} type="submit">
          <FaApple size={28} />
        </Button>
      </>
    )
  }
}

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <Container>
        <Something />
      </Container>
    </div>
  );
}

export default App;
