import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import React from 'react';

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
        this.setState({ text: res.data });
      }, (err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <>
        <pre>{this.state.text}</pre>
        <input type="button" onClick={this.getBackend} value="Push Me!"></input>
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
