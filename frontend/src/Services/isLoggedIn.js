import axios from 'axios';

// returns [ loggedIn, status, user/failStatusCode ]

async function isLoggedIn () {
    var Result;

    try {
        let res = await axios.get('/app/checkLogin');
        Result = [true, res.status, res.data]
    }
    catch (err) {
        let status = 500;
        if (err.response) {
            status = err.response.status
        }
        console.error(err);
        Result = [false, status, null];
    }

    return Result;
}

export default isLoggedIn