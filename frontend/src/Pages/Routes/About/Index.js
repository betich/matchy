import { Button } from 'react-bootstrap';
import { FaFacebookF, FaLine } from 'react-icons/fa';

const About = () => {
    return (
    <div id="about">
        <h1>About Us</h1>
        <hr />
        <p>Matchy is a project made with love an passion. Skinny, strong robust affogato viennese lungo strong french press. Bar , skinny, filter mazagran breve in galão organic. Acerbic black qui aromatic, single shot carajillo shop black organic. Whipped frappuccino, mug a est kopi-luwak irish grinder acerbic.</p>
        <p>Froth mocha breve a galão skinny cinnamon aftertaste shop. Dark, a cortado cream, plunger pot, sit eu a arabica iced kopi-luwak. Instant crema id whipped carajillo espresso mug café au lait. Half and half saucer mocha java, chicory, bar  in seasonal strong grinder.</p>
        
        <p>Follow us at:</p>
        <a
            href="https://www.facebook.com/Planty-102827135112130/?__tn__=%3C"
            target="_blank"
            rel="noreferrer"
        >
            <Button variant="outline-facebook">
                <FaFacebookF size={48} />
            </Button>
        </a>
        <a
            href="https://line.me/ti/g2/hFWEKeaGSa9R5Oh7hZm2Ag?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
            target="_blank"
            rel="noreferrer"
        >
            <Button variant="outline-line">
                <FaLine size={48} />
            </Button>
        </a>
    </div>
    );
  }

  export default About;