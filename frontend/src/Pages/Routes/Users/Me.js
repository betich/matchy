import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import getUser from '../../../Services/getUser';

const Me = (props) => {
    const [error, setError] = useState(null);
    let history = useHistory();
    
    useEffect(() => {
        const reqUser = async () => {
            let user = await getUser();
            if (user) history.push(`/users/${user.username}`);
            else setError("You have to be logged in first"); 
        }

        reqUser();
    }, [history])

    return (
        <>
        {
            (error) ?  <span>{error}</span> : <></>
        }
        </>
    );
}

export default Me;