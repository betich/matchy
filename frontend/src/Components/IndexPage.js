import axios from 'axios';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaGoogle, FaFacebookF, FaLine, FaApple } from 'react-icons/fa';

import NavigationBar from './Partials/Navbar';

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        text: ''
      }
      this.getBackend = this.getBackend.bind(this);
    }
  
    getBackend() {
      axios.get('app/projects/')
        .then((res) => {
          this.setState({ text: res.data.projects[0].name });
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

function Index() {
    return (
      <div>
        <header className="header">
          <NavigationBar />
        </header>
        <Container>
          <Main />
        </Container>
      </div>
    );
}
  
export default Index;