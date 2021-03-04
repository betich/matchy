import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { NavigationLists as NavList } from "../Services/NavigationLists";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const NavElement = (props) => {
    let icon = (props.elem.icon) ? props.elem.icon : '';

    return (
        <Nav.Link as={Link} to={props.elem.url} >
            <li>{icon}<span>{"   " + props.elem.name}</span></li>
        </Nav.Link>
    );
};

const NavigationBar = (props) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
        props.setExpanded(!show);
    };

    return (
        <>
            <div onClick={handleClick} className="hamburger">
                {show ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
            </div>
            <div className={show ? "sidebar expand" : "sidebar"}>
                <Nav>
                    <ul>
                        {NavList.map((elem, i) => {
                            return (<NavElement key={i} elem={elem} />);
                        })}
                    </ul>
                </Nav>
            </div>
        </>
    );
};

export default NavigationBar;
