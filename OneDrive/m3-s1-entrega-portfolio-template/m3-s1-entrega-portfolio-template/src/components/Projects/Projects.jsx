import ProjectCard from "./ProjectCard/ProjectCard";

import { projects } from "../../data/projects.js";

import styles from "./styles.module.css";

export default function Projects() {
  return (
    <div id="projects" className={styles.projects}>
      <h2 className={styles.title}>Projetos</h2>
      <div className={styles.projectsWrapper}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
