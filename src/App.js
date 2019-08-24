import React, { useState, useEffect } from 'react';
import JobContainer from './JobContainer';
import './styles/App.scss';

function App() {
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        fetch("jobs.json").then((response) => {
            response.json().then(data => {
                setJobs(data);
            })
        });
    }, []);

    return (
        <div className="wrapper">
            <div id="menu">
                <button>Web</button>
                <button>Games</button>
                <button>Education</button>
                <button>Social</button>
                <button>Contact</button>
            </div>
            <div className="container">
                <div className="intro">
                    <h1>Cameron<br />Hall</h1>
                    <p>Adipiscing diam donec adipiscing tristique risus nec feugiat. Sed enim ut sem viverra aliquet eget sit. Vel risus commodo viverra maecenas accumsan. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Lorem ipsum dolor sit amet consectetur adipiscing. Urna neque viverra justo nec ultrices. Tortor consequat id porta nibh venenatis cras sed felis. Ullamcorper eget nulla facilisi etiam. Augue mauris augue neque gravida in fermentum. Sit amet venenatis urna cursus eget. Elementum curabitur vitae nunc sed velit. Rhoncus urna neque viverra justo nec ultrices dui sapien.</p>
                </div>
                {jobs ? jobs.map((job) => {
                    return <JobContainer key={job.title} job={job} />
                }) : null}
            </div>
        </div>
    );
}

export default App;
