import axios from 'axios';

// returns { user }

async function getUser () {
    let Result;

    try {
        let res = await axios.get('/app/users/me');
        Result = res.data;
    }
    catch (err) {
        console.error(err);
        Result = null;
    }

    return Result;
}

export default getUser