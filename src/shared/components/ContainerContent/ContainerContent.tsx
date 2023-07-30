import styles from "./containerContent.module.css";

interface Props {
  children:  React.ReactNode;
}

export const ContainerContent: React.FC<Props>  = ({children}) => {
  return (
    <section className={styles.containerContent}>
      <div className={styles.containerContent__content}>
        {children}

      </div>
    </section>
  )
}
