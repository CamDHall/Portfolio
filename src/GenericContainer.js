import React, { useState } from 'react';
import './styles/GenericContainer.scss';

export default function GenericContainer(props) {
    const [activeProject, setActiveProject] = useState( props.experience.projects[0]);
    const [activeImage, setActiveImage]     = useState(props.experience.imageSrc);
    const [projects, setProjects]           = useState(props.experience.projects);


    const changeActiveProject = (projectTitle) => {
        const element = document.getElementById(`fade-${props.experience.company}`);
        const img = document.getElementById(`img-${props.experience.company}`);
        let imageSrc = props.experience.imageSrc;

        const indexOfProject = projects.find(function(item, i) {
            const isCurrentTitle = item.title === projectTitle;
            if(isCurrentTitle && item.imageSrc !== undefined) {
                imageSrc = item.imageSrc;
            }
            return isCurrentTitle;
        });

        // Fade text
        element.classList.remove("fade");
        void element.offsetWidth;
        element.classList.add("fade");
        // Fade image
        img.classList.remove("fade");
        void img.offsetWidth;
        img.classList.add("fade");

        setTimeout(function() { 
            setActiveProject(indexOfProject)
            setActiveImage(imageSrc); 
        }, 500);
    }

    function showFullImage(path, name) {
        const imgContainer = document.getElementById("fullImage");
        
        imgContainer.classList.remove("hide");
        imgContainer.classList.add("show");

        const img = imgContainer.getElementsByTagName("img")[0];
        img.src = `image/${activeImage}`;
        img.alt = props.experience.company;
    }

    return(
        <div className="generic-container">
            <img id={`img-${props.experience.company}`} src={"image/" + activeImage} alt={props.experience.title} 
            onClick={showFullImage}/>
            <div className="text-container">
                <h3>{props.experience.company}</h3>
                <h5>{props.experience.title}, {props.experience.time}</h5>

                <div id={`fade-${props.experience.company}`}>
                    {/* using dangerouslysetHTML for a tags in json*/}
                    <p className={activeProject.title} dangerouslySetInnerHTML={{__html: activeProject.description}}></p>

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
                            console.log(project.title);
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