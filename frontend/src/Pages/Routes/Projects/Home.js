import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import getUser from '../../../Services/getUser';
import axios from 'axios';
import ProjectCard from '../../../Components/ProjectCard';

const Index = (props) => {
    const [Projects, setProjects] = useState([]);
    const [currentUser, setUser] = useState(null);
    const [loaded, setLoad] = useState(false);
    const [error, setError] = useState(null); 
    
    useEffect(() => {
        const reqUser = async () => {
            let user = await getUser();
            if (user) setUser(user);
            else setError("You have to be logged in first"); 
        }

        reqUser();

        axios.get(`/app/projects`)
            .then((res) => res.data)
            .then((projects) => {
                setProjects(projects);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 500) setError("Internal server error");
                    else setError(err.response.data);
                } else {
                    setError("An error occured");
                }

                console.error(err)
            })
            .finally(() => setLoad(true))
    }, []);

    let MyProjects = Projects.filter((project) => project.owner.username === currentUser.username);
    let WorkingProjects = Projects.filter((project) => project.workers.some((worker) => {
        return worker.username === currentUser.username
    }));

    MyProjects = MyProjects.map((project) => <ProjectCard project={project} key={project._id} />);
    WorkingProjects = WorkingProjects.map((project) => <ProjectCard project={project} key={project._id} />);
    
    const renderComponents = () => {
        const HomeProject = () => {
            return (
                <>
                    <h1>Projects</h1>
                    <Link to="/projects/create">
                        <Button variant="outline-danger" type="submit">
                            Create
                        </Button>
                    </Link>
                    <div id="projectLinks">
                        <h4>Your Projects</h4>
                        <div className="d-flex flex-wrap">
                            {MyProjects}
                        </div>
                        <h4>Projects you're working with</h4>
                        <div className="d-flex flex-wrap">
                            {WorkingProjects}
                        </div>
                    </div>
                </>
            );
        }

        if (loaded) {
            if (error) return (<span>{error}</span>);
            else return (<> { HomeProject() } </>);
        } else {
            return (<span>loading...</span>)
        }
    }

    return (
        <>
            { renderComponents() }
        </>
    );
}

export default Index;