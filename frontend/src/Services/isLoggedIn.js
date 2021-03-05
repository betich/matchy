import axios from 'axios';

// returns [ loggedIn, status, user/failStatusCode ]

async function isLoggedIn () {
    var Result;

    try {
        let res = await axios.get('/app/checkLogin');
        Result = [true, res.data]
    }
    catch (err) {
        console.error(err);
        Result = [false, null];
    }

    return Result;
}

export default isLoggedIn