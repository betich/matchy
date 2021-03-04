import './App.css'; // Bootstrap
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Pages/Routes';
import Loading from './Components/Loading';
import Flash from './Components/Flash';
import Bus from './Services/Bus';
const NavigationBar = React.lazy(() => import('./Components/NavBar'));

window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

function App() {
	const [message, setMessage] = useState(null);
	const [type, setType] = useState(null);
	const [visible, setVisibility] = useState(false);
	const [sidebarexpanded, setSidebarexpanded] = useState(false);

	useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
			setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 4000);
        });
    }, []);

	return (
	<React.Suspense fallback={<Loading />}>
		<Router>
			<div className="App">
				<div className="sidebar-wrapper">
					<NavigationBar setExpanded={setSidebarexpanded} />
				</div>
				<div className={sidebarexpanded ? 'main expanded' : 'main'}>
					<Container>
						{ visible &&
							<Flash
							type={type}
							message={message}
							onClose={() => setVisibility(false)}
							/>
						}
						<Routing />
					</Container>
				</div>
			</div>
		</Router>
	</React.Suspense>
  );
}

export default App;