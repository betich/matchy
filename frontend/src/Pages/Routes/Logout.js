import { useEffect } from 'react'; 
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Logout = (props) => {
    const history = useHistory();

    useEffect(() => {
        axios.get('/app/logout/')
            .then((res) => {
                window.flash('Logged you out', 'success');
                history.push('/')
            })
            .catch((err) => {
                console.error(err);
                window.flash('An error occured', 'error');
                history.push('/');
            })

    }, [history])

    return <span>s</span>
}

export default Logout;