import { Button } from 'react-bootstrap';
import { FaFacebookF, FaLine } from 'react-icons/fa';

const About = () => {
    return (
    <>
        <h2>About Us</h2>
        <p>who cares feck off</p>
        <a
            href="https://www.facebook.com/Planty-102827135112130/?__tn__=%3C"
            target="_blank"
            rel="noreferrer"
        >
            <Button variant="outline-primary">
                <FaFacebookF size={28} />
            </Button>
        </a>
        <a
            href="https://line.me/ti/g2/hFWEKeaGSa9R5Oh7hZm2Ag?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
            target="_blank"
            rel="noreferrer"
        >
            <Button variant="outline-success">
                <FaLine size={28} />
            </Button>
        </a>
    </>
    );
  }

  export default About;