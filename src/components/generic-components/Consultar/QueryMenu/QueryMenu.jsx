import { Form, useSubmit } from 'react-router-dom';
import { Button } from '../../Button/Button';
import styles from './Query.module.css';
import { useEffect, useRef, useState } from 'react';





export function QueryMenu({children, currentPage}) {

  let submit = useSubmit();
  let pageInputRef = useRef(null);

  //We use the ref to modify the input natively, so that we do not depend on state.
  //Our only source of truth of the input is the currentPage parameter. When we change the input, we change the URL,
  //So that it always stays consistent
  
  function handlePageChange(e) {
    if(e.target.value < 1) {
      pageInputRef.current.value = 1;
    }
    else {
      pageInputRef.current.value = e.target.value.replace(/[a-zA-Z\s\\-]+/g, "");
      
    }
    submit(e.currentTarget.form);

  }

  function handlePageIncrement(e, number) {

    if(Number(pageInputRef.current.value) + Number(number) < 1) {
      pageInputRef.current.value = 1;
    }
    else {
      pageInputRef.current.value = Number(pageInputRef.current.value) + Number(number);
      submit(e.currentTarget.form);
    }
    
  }

  function handleSubmit(e) {
    pageInputRef.current.value = 1;
    submit(e.currentTarget.form);
  }

  return (
    <Form className={styles.formContainer}>
      <div className={styles.filters}>
        <div className={styles.button}>
          <Button onClick={(e)=> handleSubmit(e)}size='big' type={'submit'} buttonClass={'search'}>
            Buscar
          </Button>
        </div>
        <div className={styles.filterInputs}>
          {children}
        </div>
      </div>
      
      <div className={styles.pageSelectorContainer}>
        <div className={styles.pageInfo}>
          <div className={styles.pageCount}>
            Pagina {currentPage} de 100
          </div>
          <div className={styles.totalResults}>
            Resultados: 21
          </div>
        </div>
        <div className={styles.pageSelector}>
          <button type='button' className={styles.pageButton}>
            <span className='material-symbols-out'>first_page</span>
          </button>
          <button type='button' onClick={(e)=>(handlePageIncrement(e, -1))} className={styles.pageButton}>
            <span className='material-symbols-out'>navigate_before</span>
          </button>
          <input ref={pageInputRef} 
            name="page"
            defaultValue={currentPage}
            onChange={(e)=> handlePageChange(e)}
            />
          <button type='button' onClick={(e)=>(handlePageIncrement(e, 1))} className={styles.pageButton}>
            <span className='material-symbols-out'>navigate_next</span>
          </button>
          <button type='button' className={styles.pageButton}>
            <span className='material-symbols-out'>last_page</span>
          </button>
        </div>
    </div>

    </Form>
  )
}



export function Fieldset({children, header}) {
  return (
    <fieldset className={styles.fieldset}>
      <header className={styles.fieldsetHeader}>
        {header}
      </header>
      <div className={styles.fieldsetInputs}>
        {children}
      </div>
     
    </fieldset>
  )
}

export function Input({attributeName, type, label, defaultValue}) {
  return (
    <div className={styles.input}>
      <label htmlFor={attributeName}>{label}</label>
      <input type={type} id={attributeName} name={attributeName} defaultValue={defaultValue} />
    </div>
  )
}

export function CheckboxList({attributeName, buttons}) {
  return (
          <div className={styles.checkBoxList}>
              {
                  buttons.map((b, index) => {
                      return (
                          <div key={index} className={styles.checkBox}>
                              <input
                                  id={b.label}
                                  type='checkbox'
                                  value={b.value}
                                  name={attributeName}
                                  defaultChecked={b.defaultChecked}
                                  
                                  />
                              <label htmlFor={b.label}>
                                  {b.label}
                              </label>
                          </div>
                      )
                  })
              }
          </div>
  )}
