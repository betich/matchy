import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

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
        <Button variant="outline-secondary" onClick={this.getBackend} type="submit">Push Me!</Button>
      </>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Something />
      </header>
    </div>
  );
}

export default App;
