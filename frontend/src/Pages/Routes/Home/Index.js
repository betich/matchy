import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="mt-3 ml-3">
            <h1>
                Welcome.
            </h1>
            <p><Link to="/projects">Projects</Link></p>
            <p><Link to="/users">Users</Link></p>
        </div>
    )
}

export default Home;