import { AiFillHome, AiFillProject, AiFillQuestionCircle } from "react-icons/ai";
import { BsArrowLeftRight, BsFillPersonFill } from "react-icons/bs";

const NavigationLists = [
    { name: "Home", icon: <AiFillHome size={36} />, url: "/" },
    { name: "Match", icon: <BsArrowLeftRight size={36} />, url: "/match" },
    { name: "Projects", icon: <AiFillProject size={36} />, url: "/project"},
    { name: "Me", icon: <BsFillPersonFill size={36} />, url: "/me" },
    { name: "About", icon: <AiFillQuestionCircle size={36} />, url: "/about" }
];

export { NavigationLists };
