import TechCard from "./TechCard/TechCard";

import { technologies } from "../../data/technologies.js";

import styles from "./styles.module.css";

export default function Techs() {
  return (
    <div id="stack" className={styles.techs}>
      <h2 className={styles.title}>Tecnologias</h2>
      <div className={styles.techsWrapper}>
        {technologies.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
}
