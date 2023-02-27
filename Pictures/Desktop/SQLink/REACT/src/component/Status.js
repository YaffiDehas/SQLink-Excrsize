import React from "react";

const Status = ({ projects }) => {
    const projectMatDeadLine = projects && projects.filter((project) => project.madeDadeline);
    let sum = 0;
    const scores = projects && projects.map((project) => sum += project.score);
    return (
        <>
            {projectMatDeadLine && <>
                <b>The percentage of projects that met the deadline: </b>
                <span>{projectMatDeadLine.length / projects.length}%</span>
            </>}
            {scores && <>
                <b>the average score.: </b>
                <span>{sum / projects.length}</span>
            </>}

        </>
    );
};

export default Status;
