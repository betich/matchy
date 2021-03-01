import React from 'react';
import { FillQA } from "../../../Components/QAForm";

const FormProject = (props) => {
    const Project = props.project;

    return (
        <>
            <FillQA project={Project} onSubmit={props.onSubmit} />
        </>
    )
}

export default FormProject;