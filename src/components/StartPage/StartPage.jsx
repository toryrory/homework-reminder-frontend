import css from './StartPage.module.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';

export default function StartPage() {
 
  return (
      <main className={css.main}>
          <AuthorizationForm  />
    </main>
  )
}
