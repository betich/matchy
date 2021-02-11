import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaGoogle, FaFacebookF, FaLine, FaApple } from 'react-icons/fa';
import isLoggedIn from '../../../Services/isLoggedIn';

const About = () => {
    const [data, setData] = useState('');
    
    const getBackend = async () => {
        const [loggedIn, status, user] = await isLoggedIn();
        if (loggedIn && status === 200) {
            setData(user.username);
        } else {
            setData('you\'re not logged in');
        }
    };

    return (
    <>
        <pre>{data}</pre>
        <Button variant="outline-danger" onClick={getBackend}>
        <FaGoogle size={28} />
        </Button>
        <Button variant="outline-primary" onClick={getBackend}>
        <FaFacebookF size={28} />
        </Button>
        <Button variant="outline-success" onClick={getBackend}>
        <FaLine size={28} />
        </Button>
        <Button variant="outline-secondary" onClick={getBackend}>
        <FaApple size={28} />
        </Button>
    </>
    );
  }

  export default About;