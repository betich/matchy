import { useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaGoogle, FaFacebookF, FaLine, FaApple } from 'react-icons/fa';

const About = () => {
    const [State, setState] = useState('');

    const getBackend = () => {
        axios.get('/app/users')
        .then(res => {
            setState(JSON.stringify(res.data));
        })
    };


    return (
    <>
        <pre>{State}</pre>
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