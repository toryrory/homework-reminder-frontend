import css from "./AuthorizationForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp, logIn } from "../../operations/operations";
import { MdErrorOutline } from "react-icons/md";

export default function AuthorizationForm() {
  const [formRegister, setFormRegister] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const changeFormRegister = () => {
    setFormRegister((prevState) => !prevState);
    setError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const { name, surname, email, password } = e.target.elements;
    
    if (formRegister) {
       if (!name.value || !surname.value || !email.value || !password.value) {
         setError("emptyField");
         return;
       }
      const dataRegister = {
        email: email.value,
        password: password.value,
        first_name: name.value,
        last_name: surname.value,
      };
      signUp(dataRegister)
        .then((data) => { navigate(`/account/${data.user.id}`);  localStorage.setItem("name", data.user.first_name);})
        .catch((error) => {
          console.log(error);
          setError("registerError");
        }); //navigate(`/account/${data.user.id}`)
     
    } else {
       if (!email.value || !password.value) {
         setError("emptyField");
         return;
       }
       const dataLogin = {
         email: email.value,
         password: password.value,
       };
      logIn(dataLogin)
        .then((data) => { navigate(`/account/${data.user.id}`); localStorage.setItem(
          "name",
          data.user.first_name + " " + data.user.last_name
        );})
        .catch((error) => { console.log(error);  setError("loginError")});
    }
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit} autoComplete='off'>
        <h2 className={css.title}>{formRegister ? "Signup" : "Log In"}</h2>
        {error === "emptyField" && (
          <p className={css.error}>
            <MdErrorOutline size={20} /> please fill out all fields
          </p>
        )}
        {error === "loginError" && !formRegister && (
          <p className={css.error}>
            <MdErrorOutline size={20} /> incorrect email or password
          </p>
        )}
        {error === "registerError" && formRegister && (
          <p className={css.error}>
            <MdErrorOutline size={20} /> Email is already taken
          </p>
        )}

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
