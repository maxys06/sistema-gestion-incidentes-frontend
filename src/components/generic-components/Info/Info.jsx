import { LinkButton, Button, GoBackButton } from '../Button/Button';
import styles from './Info.module.css';

export function Info({children, handleDelete, dataId}) {
  return (
  <div className={styles.infoContainer}>
    <div className={styles.actions}>
      <GoBackButton size='normal'>Volver</GoBackButton>
      <LinkButton to={`../edit/${dataId}`} size='normal' buttonClass={'edit'}>Editar</LinkButton>
      <Button onClick={handleDelete} size='normal' buttonClass={'delete'}>Eliminar</Button>
    </div>
    <div className={styles.content}>{children}</div>
  </div>
  )
}

export function InfoGroup({header, children}) {
  return (
    <div className={styles.infoGroup}>
      <header className={styles.groupHeader}>{header}</header>
      <div className={styles.infoGroupElements}>
        {children}
      </div>
    </div>
  )
}

export function Attribute({attributeName, children})
{
  return (
    <div className={styles.attribute}>
      <span className={styles.attributeName}>{attributeName}{`:`}</span>
      <div className={styles.attributeContent}>
        {children}
      </div>
    </div>
  )}


export function InfoList({children}) {

  return (
    <ul className={styles.list}>
      {children}
    </ul>
  )
}

export function ListElement({children, color}) {
  return (
    <ul className={`${styles.listElement} ${styles[color]}`}>
      {children}
    </ul>
  )
}