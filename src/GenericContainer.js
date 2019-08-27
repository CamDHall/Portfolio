import React, { useState, useEffect } from 'react';
import './styles/GenericContainer.scss';

export default function GenericContainer(props) {
    const [activeProject, setActiveProject] = useState( props.experience.projects[0]);
    const [projects, setProjects]           = useState(props.experience.projects);


    const changeActiveProject = (projectTitle) => {
        const element = document.getElementById(`fade-${props.experience.company}`);

        const indexOfProject = projects.find(function(item, i) {
            return item.title === projectTitle;
        });

        element.classList.remove("fade");
        void element.offsetWidth;
        element.classList.add("fade");
        setTimeout(function() { setActiveProject(indexOfProject) }, 500);
    }

    return(
        <div className="generic-container">
            <img src={"image/" + props.experience.imageSrc} alt={props.experience.title} />
            <div className="text-container">
                <h3>{props.experience.company}</h3>
                <h5>{props.experience.title}</h5>

                <div id={`fade-${props.experience.company}`}>
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
                        props.experience.projects.map(project => {
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
            </div>
        </div>
    )
}