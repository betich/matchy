import './App.css'; // Bootstrap
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Pages/Routes';
import Loading from './Components/Loading';

function App() {
	return (
	<>
		<React.Suspense fallback={<Loading />}>
			<Router>
				<Main />
			</Router>
		</React.Suspense>
	</>
	);
}

export default App;