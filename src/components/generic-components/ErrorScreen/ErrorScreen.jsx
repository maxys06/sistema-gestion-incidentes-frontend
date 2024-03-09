import { useRouteError } from 'react-router-dom';
import styles from './ErrorScreen.module.css';

export function ErrorScreen({title, message}) {

  let errors = useRouteError();

  return (

    <section className={styles.errorContainer}>
      <header>{title}</header>
      <div>
        {errors.message}
        
      </div>
    </section>

  )


}