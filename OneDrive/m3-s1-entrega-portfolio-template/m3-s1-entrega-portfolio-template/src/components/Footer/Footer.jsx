import { user } from "../../data/user.js";

import styles from "./styles.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.contact}>
        <h2 className={styles.title}>Contato</h2>
        <div className={styles.socials}>
          <a href="http://api.whatsapp.com/send?1=pt_BR&phone=5583988283128"><img src="src/assets/whatsapp-icon.svg" alt="WhatsApp" /></a>
          <a href="https://github.com/luizaleblanc"><img src="src/assets/github-social-icon.svg" alt="WhatsApp" /></a>
          <a href="https://www.linkedin.com/in/luiza-ferraz-leblanc-7727ba167/"><img src="src/assets/linkedin-icon.svg" alt="Linkedin" /></a>
        </div>
      </div>
      <span>Todos os direitos reservados | {user}</span>
    </div>
  );
}
