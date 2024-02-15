import Button from "../Button/Button";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <a href="#" className={styles.logo}>
        Portfólio
      </a>
      <div className={styles.menu}>
        <a className={styles.link} href="#aboutMe">
          Sobre
        </a>
        <a className={styles.link} href="#stack">
          Stack
        </a>
        <a className={styles.link} href="#projects">
          Projetos
        </a>
      </div>
        <a href="http://api.whatsapp.com/send?1=pt_BR&phone=5583988283128">
          <Button label="Contato" />
        </a>
    </div>
  );
}
