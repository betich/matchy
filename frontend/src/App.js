import './App.css'; // Bootstrap
import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Pages/Routes';
import Loading from './Components/Loading';
const NavigationBar = React.lazy(() => import('./Components/NavBar'));

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
      <div className="App">
        <header className="App-header">
          <NavigationBar />
        </header>
        <Container>
          <Routing />
        </Container>
      </div>
      </Router>
    </React.Suspense>
  );
}

export default App;