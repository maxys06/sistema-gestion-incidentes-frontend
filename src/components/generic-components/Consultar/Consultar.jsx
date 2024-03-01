import { Button, LinkButton } from '../Button/Button';
import styles from './Consultar.module.css';
import queryStyles from './Query.module.css';



export function ConsultarMenuWrapper({children, header}) {
  return (
    <section className={styles.consultarContainer}>
      <header className={styles.consultarHeader}>{header}</header>
      {children}

    </section>
  )
}

export function QueryMenu({children}) {
  return (
    <form className={queryStyles.filterForm}>
      <div className={queryStyles.filterButtonContainer}>
        <Button size='big' type={'button'} buttonClass={'search'}>
          Buscar
        </Button>
      </div>
      <div className={queryStyles.filters}>{children}</div>
    </form>
  )
}

export function Fieldset({children, header}) {
  return (
    <fieldset className={queryStyles.fieldset}>
      <header className={queryStyles.fieldsetHeader}>
        {header}
      </header>
      <div className={queryStyles.fieldsetInputs}>
        {children}
      </div>
     
    </fieldset>
  )
}

export function Input({attributeName, type, label}) {
  return (
    <div className={queryStyles.input}>
      <label htmlFor={attributeName}>{label}</label>
      <input id={attributeName}/>
    </div>
  )
}

export function CheckboxList({attributeName, register, buttons, error, requiredMessage}) {
  return (
          <div className={queryStyles.checkBoxList}>
              {
                  buttons.map((b, index) => {
                      return (
                          <div key={index} className={queryStyles.checkBox}>
                              <input 
                                  id={b.label}
                                  type='checkbox'
                                  value={b.value}/>
                              <label htmlFor={b.label}>
                                  {b.label}
                              </label>
                          </div>
                      )
                  })
              }
          </div>
  )}


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