import styles from './ConsultarMenuWrapper.module.css';

export function ConsultarMenuWrapper({children, header}) {
  return (
    <section className={styles.consultarContainer}>
      <header className={styles.consultarHeader}>{header}</header>
      {children}

    </section>
  )
}