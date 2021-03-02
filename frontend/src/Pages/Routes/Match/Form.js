import React from 'react';
import { FillQA } from "../../../Components/QAForm";

const FormProject = (props) => {
    const Project = props.project;

    return (
        <>
            <h2>Apply to {Project.name}</h2>
            <FillQA project={Project} onSubmit={props.onSubmit} />
        </>
    )
}

export default FormProject;