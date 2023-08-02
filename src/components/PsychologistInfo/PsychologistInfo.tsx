import styles from "./psychologistInfo.module.css";

export const PsychologistInfo = () => {

  return (
    <div className={styles.psychologistInfo}>
      <h3 className={styles.name}>Запись к психологу</h3>
      <p className={styles.text}>Если вам нужна поддержка, вы можете записаться на сессию с психологом.</p>
      <a target="_blank" href="https://yasno.live/" className={styles.button}>Записаться на консультацию</a>
    </div>
  );
};
