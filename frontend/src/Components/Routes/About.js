import { useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaGoogle, FaFacebookF, FaLine, FaApple } from 'react-icons/fa';

const About = () => {
    const [State, setState] = useState('');

    const getBackend = () => {
        axios.get('/api')
        .then(res => {
            setState(res.data);
        })
    };    

    return (
    <>
        <pre>{State}</pre>
        <Button variant="outline-danger" onClick={getBackend} type="submit">
        <FaGoogle size={28} />
        </Button>
        <Button variant="outline-primary" onClick={getBackend} type="submit">
        <FaFacebookF size={28} />
        </Button>
        <Button variant="outline-success" onClick={getBackend} type="submit">
        <FaLine size={28} />
        </Button>
        <Button variant="outline-secondary" onClick={getBackend} type="submit">
        <FaApple size={28} />
        </Button>
    </>
    );
  }

  export default About;