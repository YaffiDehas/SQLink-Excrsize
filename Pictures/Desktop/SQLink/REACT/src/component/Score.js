import React from "react";

const Score = ({ score }) => {
    return (
        <>
            <b>Score: </b>
            {(score < 70) ? <span style={{ color: "red" }}>{score}</span>
                : (score > 90) ? <span style={{ color: "green" }}>{score}</span>
                    : <span style={{ color: "black" }}>{score}</span>}
        </>
    );
};

export default Score;
