import styles from './ResultTable.module.css'
import { Button, LinkButton } from '../../Button/Button';

export function ResultTable({children, caption}) {
  return(
    <div className={styles.resultScreen}>
        <table className={styles.table}>
          <caption>{caption}</caption>
          {children}
        </table>
    </div>
  )
}

export function HeaderRow({children}) {

  //fields: an array of strings.

  return (
    <thead className={styles.tableHeader}>
      <tr>
        {children}
        <th className={styles.cellHeader}>Acciones</th>
      </tr>
    </thead>
  )
}

export function HeaderCell({onSort, attributeName, isCurrentlySorted, sortingOrientation, children}) {

  let sortingOrderStyle = sortingOrientation=='asc' ? styles.ascSort : styles.descSort;
  let sortedStyle = isCurrentlySorted ? `${styles.sorted} ${sortingOrderStyle}`: ""

  return(
    <th className={styles.cellHeader}>
      <button 
        className={`${styles.sortingButton} ${sortedStyle}`}
        onClick={() => onSort(attributeName)}>
        {children}
      </button>
     
    </th>
  )
}

export function DataRow({dataId, fields, modifiable=true, deleteable=true, onDelete={function () {console.log("No Function")}}}) {
  return(
    <tr className={styles.row}>
      {fields.map(f => {
        return (
          <td key={f} className={`${styles.cell}`}>
            {f}
          </td>
        )
      })}
      <td className={styles.cell}>
        <div className={styles.actionButtonList}>
          {<LinkButton size="small" buttonClass="consultar" to={`./${dataId}`}>Consultar</LinkButton>}
          {modifiable && <LinkButton size="small" buttonClass="edit"to={`./edit/${dataId}`}>Modificar</LinkButton>}
          {deleteable && <Button buttonClass='delete' size='small' onClick={() => onDelete(dataId)}>Eliminar</Button>}
        </div>
      </td>

      
    </tr>
  )
}