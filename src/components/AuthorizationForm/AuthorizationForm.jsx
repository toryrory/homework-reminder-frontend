import css from "./AuthorizationForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp, logIn } from "../../operations/operations";

export default function AuthorizationForm() {
  const [formRegister, setFormRegister] = useState(true);
  const navigate = useNavigate();

  const changeFormRegister = () => {
    setFormRegister((prevState) => !prevState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, surname, email, password } = e.target.elements;
    
    if (formRegister) {
      const dataRegister = {
        email: email.value,
        password: password.value,
        first_name: name.value,
        last_name: surname.value,
      };
      signUp(dataRegister)
        .then((data) => { navigate(`/account/${data.user.id}`);  localStorage.setItem("name", data.user.first_name);})
        .catch((error) => console.log("custom error:", error)); //navigate(`/account/${data.user.id}`)
     
    } else {
       const dataLogin = {
         email: email.value,
         password: password.value,
       };
      logIn(dataLogin)
        .then((data) => { navigate(`/account/${data.user.id}`); localStorage.setItem(
          "name",
          data.user.first_name + " " + data.user.last_name
        );})
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      <form className={css.form} onSubmit={handleSubmit} autoComplete='off'>
        <h2 className={css.title}>{formRegister ? "Signup" : "Log In"}</h2>
        {formRegister && (
          <>
            <label className={css.label} htmlFor='name'>
              {" "}
              First name:
            </label>
            <input className={css.input} name='name' />
            <label className={css.label} htmlFor='surname'>
              Last name:
            </label>
            <input className={css.input} name='surname' />{" "}
          </>
        )}
        <label className={css.label} htmlFor='email'>
          Email:
        </label>
        <input className={css.input} name='email' />
        <label className={css.label} htmlFor='password'>
          Password:
        </label>
        <input className={css.input} name='password' />
        <Link className={css.link} onClick={changeFormRegister}>
          {formRegister
            ? "Already have an account? Please Log In"
            : "Don`t have an account? Please Sign Up"}
        </Link>
        <button className={css.submit} type='submit'>
          {formRegister ? "SignUp me!" : "Log in"}
        </button>
      </form>
    </>
  );
}
