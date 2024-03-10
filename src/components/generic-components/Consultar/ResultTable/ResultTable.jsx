import styles from './ResultTable.module.css'
import { Button, LinkButton } from '../../Button/Button';
import { useEffect, useState } from 'react';
import modalService from '../../../../services/modalService';

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

export function HeaderCell({onSort, attributeName, isCurrentlySorted, sortingOrientation, children, comparator=undefined}) {

  let sortingOrderStyle = sortingOrientation=='asc' ? styles.ascSort : styles.descSort;
  let sortedStyle = isCurrentlySorted ? `${styles.sorted} ${sortingOrderStyle}`: ""

  return(
    <th className={styles.cellHeader}>
      <button 
        className={`${styles.sortingButton} ${sortedStyle}`}
        onClick={() => onSort(attributeName, comparator)}>
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
          {<LinkButton size="small" buttonClass="consultar" to={`./${dataId}`}></LinkButton>}
          {modifiable && <LinkButton size="small" buttonClass="edit"to={`./edit/${dataId}`}></LinkButton>}
          {deleteable && <Button buttonClass='delete' size='small' onClick={() => onDelete(dataId)}></Button>}
        </div>
      </td>

      
    </tr>
  )
}


export function GenericResultTable({caption, dataArray, dataIdAttribute, dataAttributeArray, deleteService, modifiable=true, deleteable=true}) {

  /*
    dataIdAttribute: 
      {
        title,
        attribute,
        comparator
      }
      The attribute that represents the ID of each entry.
      

    Data Attribute: Is a generic object that represents a data column.

    dataAttribute = {
      title
      attribute
      comparator //Optional Custom comparator function, to handle the comparations for sorting the table
    }

  */

  if(!dataIdAttribute.attribute) {
    throw Error("There is no attribute for the ID!")
  }

  function getNextSortOrder(attribute) {
      let nextSortOrder;
      if (sortedAttribute == '' || (attribute != sortedAttribute)) {
          nextSortOrder='asc'
      }
      else {
          nextSortOrder = sortOrder == 'asc' ? 'desc' : 'asc';
      }

      return nextSortOrder;
  }
  
  function sortDataState(attribute, sortOrder, comparator=undefined) {

      if (!comparator) {
          comparator = getGenericComparator(attribute, sortOrder);
      }
      let sortedArray = [...dataArray];
      sortedArray.sort(comparator);

      setDataState(sortedArray);
  }

  function getGenericComparator(attribute, sortOrder) {
      let comparator = function(o1, o2) {
          let aValue = o1[attribute];
          let bValue = o2[attribute];


          //Handling for null values

          if (!aValue && !bValue) {
              return 0
          }
          if (!aValue) {
              return -1
          }
          if (!bValue) {
              return 1
          }

          if (sortOrder === 'asc') {
              if (aValue < bValue) return -1;
              if (aValue > bValue) return 1;
              return 0;
          } else if (sortOrder === 'desc') {
              if (aValue > bValue) return -1;
              if (aValue < bValue) return 1;
              return 0;
          } else {
              throw new Error('Invalid sort order. Please use "asc" or "desc".');
          }
      };

      return comparator; 
  }

  function handleGenericSort(attribute, comparator=undefined) {

      /* A generic sort handler. It creates a comparator according to the attribute. */
      let newSortOrder = getNextSortOrder(attribute);
      setSortedAttribute(attribute);
      setSortOrder(newSortOrder);
      sortDataState(attribute, newSortOrder, comparator);

  }

  function deleteHandler(id) {

      async function deleteEntry() {
          try {
              await deleteService(id);
              modalService.showInfo("Operacion Correcta", "Se ha eliminado el registro correctamente");
              let updatedDataState = dataState.filter(d => d[dataIdAttribute.attribute] != id);
              setDataState(updatedDataState);
          }
          catch(err) {
              console.log("Ha fallado la eliminacion del registro");
          }
      }

      modalService.ask("Seguro que desea eliminar el registro?", deleteEntry)

  }


  let [dataState, setDataState] = useState([])
  let [sortedAttribute, setSortedAttribute] = useState('');
  let [sortOrder, setSortOrder] = useState('');

  useEffect(()=> {

    if (sortedAttribute) {
      sortDataState(sortedAttribute, sortOrder);
    }
    else {
      setDataState(dataArray);
    }

  }, [dataArray])

  return (
    <ResultTable caption={caption}>

      <HeaderRow>
        <HeaderCell 
          attributeName={dataIdAttribute.attribute}
          onSort={handleGenericSort}
          isCurrentlySorted={sortedAttribute==dataIdAttribute.attribute}
          sortingOrientation={sortOrder}
          >
            {dataIdAttribute.title}
          </HeaderCell>
          
        {dataAttributeArray.map(da => { return (
        <HeaderCell 
          attributeName={da.attribute}
          onSort={handleGenericSort}
          isCurrentlySorted={sortedAttribute==da.attribute}
          sortingOrientation={sortOrder}>
            {da.title}
        </HeaderCell>)
        })}
      </HeaderRow>
      <tbody>
        {
          dataState.map(d => {
            return(
              <DataRow
                      modifiable={modifiable}
                      deleteable={deleteable}
                      onDelete={deleteHandler} 
                      key={d[dataIdAttribute.attribute]}
                       dataId={d[dataIdAttribute.attribute]}
                       fields={
                        [d[dataIdAttribute.attribute]].concat(
                        dataAttributeArray.map(da => {return (d[da.attribute])})
                       )
                      }
                      />
            )
          })
        }
      </tbody>


    </ResultTable>
  )
}