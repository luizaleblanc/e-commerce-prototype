import styles from "./styles.module.css";

export default function AboutMe() {
  return (
    <div id="aboutMe" className={styles.aboutMe}>
      <h2 className={styles.title}>Sobre mim</h2>
      <span className={styles.aboutParagraph}>
        Hey! Sou Luiza. Tenho 21 anos, sou natural de João Pessoa, PB.
        Sou Dev Full-Stack Júnior-Mid, com experiência em criação de Landing Pages 
        em Wordpress e E-Commerces.
        Sempre muito esforçada e com vontade de aprender, Tecnologia é a segunda graduação que faço.
        Possuo três pós-graduações e sou professora de Inglês para Devs.
      </span>
    </div>
  );
}
