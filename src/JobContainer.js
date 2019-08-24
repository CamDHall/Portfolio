import React, { useState, useEffect } from 'react';
import './styles/JobContainer.scss';

export default function JobContainer(props) {
    const [activeProject, setActiveProject] = useState( props.job.projects[0]);
    const [projects, setProjects]           = useState(props.job.projects);


    const changeActiveProject = (projectTitle) => {
        const element = document.getElementById(`fade-${props.job.company}`);

        const indexOfProject = projects.find(function(item, i) {
            return item.title === projectTitle;
        });

        element.classList.remove("fade");
        void element.offsetWidth;
        element.classList.add("fade");
        setTimeout(function() { setActiveProject(indexOfProject) }, 500);
    }

    return(
        <div className="job-container">
            <img src={"image/" + props.job.imageSrc} alt={props.job.title} />
            <div className="text-container">
                <h3>{props.job.company}</h3>
                <h5>{props.job.title}</h5>

                <div id={`fade-${props.job.company}`}>
                    <p className={activeProject.title}>{activeProject.description}</p>

                    <h4>Tools:</h4>
                    <ul className="tools">
                        {activeProject.tools.map((tool, index) => {
                            const txt = index < activeProject.tools.length - 1 ? 
                                `${tool},`: tool;
                            return <li key={activeProject.title + tool}>{txt}</li>
                        })}
                    </ul>
                </div>
                <div className="project-links">
                    {
                        props.job.projects.map(project => {
                            var cName = "inactive";
                            if(project.title === activeProject.title) cName = "active"
                            return (
                                <button className={cName} key={project.title} onClick={() => changeActiveProject(project.title)}>
                                    {project.title.toUpperCase()}
                                </button>
                            )
                        })
                    }
                </div>
                <div className="icon-container">
                    <div className={props.job.industry}></div>
                </div>
            </div>
        </div>
    )
}