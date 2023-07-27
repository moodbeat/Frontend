import {Button} from "@/shared/ui/Button/Button.tsx";
import styles from './Report.module.scss';

export const Report = () => {
  return (
    <div className={styles.report}>
      <h3 className={styles.title}>Персональный отчет</h3>
      <p className={styles.subtitle}>С результатами тестирования и аналитики в приложении</p>
      <Button mode="outline" title="Скачать"/>
    </div>
  );
};
