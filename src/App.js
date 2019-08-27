import React, { useState, useEffect } from 'react';
import GenericContainer from './GenericContainer';
import './styles/App.scss';

function App() {
    const [webJobs, setWebJobs]           = useState(null);
    const [gameJobs, setGameJobs]         = useState(null);
    const [schooling, setSchooling]       = useState(null);
    const [activeLink, setActiveLink]     = useState(0); 
    const [socialStatus, setSocialStatus] = useState(false);
    
    useEffect(() => {
        fetch("experiences.json").then((response) => {
            response.json().then(data => {
                let web = [];
                let games = []; 
                let schooling = [];

                data.forEach((job) => {
                    if(job.industry === "web") web.push(job);
                    else if(job.industry === "game") games.push(job);
                    else schooling.push(job);
                });

                setWebJobs(web);
                setGameJobs(games);
                setSchooling(schooling);
                // Menu effects
                const links = document.getElementById("menu").getElementsByTagName("a");

                for(let i = 0; i < links.length; i++) {
                    const link = links[i];
                    link.addEventListener("click", function() {
                        setActiveLink(i);
                    });
                }

                // Hard coded because using button instead of a tag to social icons
                const btn = document.getElementById("menu").getElementsByTagName("button")[0];
                btn.addEventListener("click", function() {
                    setActiveLink(3);
                });
            });
        });

        
    }, []);

    function toggleSocialIcons() {
        setSocialStatus(!socialStatus);
    }

    function toggleSocialIconsCheck() {
        if(socialStatus) setSocialStatus(false);
    }

    return (
        <div className="wrapper" onClick={toggleSocialIconsCheck}>
            <div id="menu">
                <a href="#web-jobs" className={activeLink === 0 ? "active-link":""}>Web</a>
                <a href="#game-jobs" className={activeLink === 1 ? "active-link":""}>Games</a>
                <a href="#education" className={activeLink === 2 ? "active-link":""}>Education</a>
                <button href="#social" onClick={toggleSocialIcons} className={activeLink === 3 ? "active-link":""}>
                    Social
                </button>
            </div>

            {
                    socialStatus ? 
                        <div id="socialIcons">
                            {/*<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/cameron.hall.18659">
                                <i className="fab small fa-facebook-square"></i>
                                </a>*/}
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/cameron-hall-98756288/">
                                <i className="fab small fa-linkedin"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/dylan_hall/">
                                <i className="fab small fa-instagram"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/CamDHall">
                                <i className="fab small fa-github"></i>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/CameronDHall">
                                <i className="fab small fa-twitter-square"></i>
                            </a>
                            <a href="mailto:camerondylan.h@gmail.com"><i className="far small fa-envelope"></i></a>
                        </div>
                    : null
            }

            <div className="container">
                <div className="intro">
                    <h1>Cameron<br /> Hall</h1>
                    <p>Adipiscing diam donec adipiscing tristique risus nec feugiat. Sed enim ut sem viverra aliquet eget sit. Vel risus commodo viverra maecenas accumsan. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Lorem ipsum dolor sit amet consectetur adipiscing. Urna neque viverra justo nec ultrices. Tortor consequat id porta nibh venenatis cras sed felis. Ullamcorper eget nulla facilisi etiam. Augue mauris augue neque gravida in fermentum. Sit amet venenatis urna cursus eget. Elementum curabitur vitae nunc sed velit. Rhoncus urna neque viverra justo nec ultrices dui sapien.</p>
                </div>
                <div id="web-jobs">
                    {webJobs ? webJobs.map((job) => {
                        return <GenericContainer key={job.title} experience={job} />
                    }) : null}
                </div>
                <div id="game-jobs">
                    {gameJobs ? gameJobs.map((job) => {
                        return <GenericContainer key={job.title} experience={job} />;
                    }) : null }
                </div>
                {
                    schooling ? 
                    <div id="education">
                    <h2>Education</h2>
                    {
                        schooling.map((school) => {
                            return <GenericContainer key={school.title} experience={school} />;
                        })
                    }
                </div>
                : null }
            </div>
        </div>
    );
}

export default App;
