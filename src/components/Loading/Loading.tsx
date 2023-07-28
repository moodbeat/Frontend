import * as React from "react";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {

  return (

    <div className={styles.container}>
      <p className={styles.text}>Загрузка...</p>
    </div>

  );
}

export default Loading;
