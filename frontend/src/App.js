import axios from 'axios';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container } from 'react-bootstrap';

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

const Nav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Container>
        <Something />
      </Container>
    </div>
  );
}

export default App;
