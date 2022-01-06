import React from "react";

function About() {
    //using React.Fragment alternative. ...to render the jsx
    return (
        <>
            <h1 className="text-6xl mb-4">Github Finder</h1>
            <p className="mb-4 text-2xl font-light">
                A React app to search GitHub profiles and see profile details.
                This project is part of the
                <a href="https://github.com/bradtraversy/github-finder-app">
                    {" "}
                    React Front To Back
                </a>{" "}
                Check out my Feed Review App here
                <strong>
                    <a href="https://feedreview.netlify.app/"> MasterMind</a>
                </strong>
                .
            </p>
            <p className="text-lg text-gray-400">
                Version <span className="text-black">1.0.0</span>
            </p>
            <p className="text-lg text-gray-400">
                Layout By:
                <a
                    className="text-black"
                    href="https://twitter.com/hassibmoddasser"
                >
                    mastermindJavascript
                </a>
            </p>
        </>
    );
}

export default About;
