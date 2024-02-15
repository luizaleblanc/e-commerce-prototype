import Button from "../Button/Button";

import {username} from "../../data/user";

import styles from "./styles.module.css";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.callToAction}>
        <span className={styles.userName}>{username}</span>
        <h2 className={styles.title}>Desenvolvedora Full-Stack</h2>
        <p className={styles.about}>Bem-vindo ao meu mundo!</p>
        <a href="https://github.com/luizaleblanc">
        <Button label="Saiba mais" />
        </a>
      </div>
      <img src="src/assets/banner-img.svg" alt="banner" />
    </div>
  );
}
