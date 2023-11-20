import { ImCross } from "react-icons/im";
import css from "./AddTaskModal.module.css";
import moment from "moment/moment";
import { useState } from "react";

export default function AddTaskModal({ onClick, closeModal }) {
  const [btnActive, setBtnActive] = useState(true);
  const dateNow = moment().format("YYYY-MM-DD[T]HH:mm");

  const handleChangeProgress = () => {
    setBtnActive((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { subject, deadline, task, details } = e.target.elements;

    const taskData = {
      subject: subject.value,
      deadline: deadline.value,
      task: task.value,
      details: details.value,
      is_done: !btnActive,
    };
    console.log(taskData);
    closeModal(taskData);
  };

  return (
    <div className={css.modal_background} id='overlay' onClick={onClick}>
      <div className={css.modal}>
        <button type='button' className={css.cross} name='close_modal'>
          <ImCross style={{ pointerEvents: "none" }} />
        </button>
        <div className={css.modal_content}>
          <form autoComplete='off' id='subject-form' onSubmit={handleSubmit}>
            <div className={css.form_top}>
              <label className={css.form_select}>
                Choose a subject{" "}
                <select className={css.form_input} name='subject' id='subject'>
                  <option value='Math'>Math</option>
                  <option value='English'>English</option>
                  <option value='Art'>Art</option>
                  <option value='History'>History</option>
                  <option value='Geometry'>Geometry</option>
                  <option value='Biology'>Biology</option>
                  <option value='Chemistry'>Chemistry</option>
                  <option value='Physics'>Physics</option>
                  <option value='Geography'>Geography</option>
                </select>
              </label>
              <label className={css.form_item}>
                Choose a deadline{" "}
                <input
                  type='datetime-local'
                  name='deadline'
                  defaultValue={dateNow}
                  className={css.form_input}
                />
              </label>
            </div>

            <label className={css.form_item}>
              Enter a task{" "}
              <textarea
                placeholder='Complete task №45'
                className={css.form_input}
                name='task'
                required
              />
            </label>
            <label className={css.form_item}>
              Enter details{" "}
              <textarea
                placeholder='Search info about this task'
                className={css.form_input}
                name='details'
              />
            </label>
            <div className={css.btns_group}>
              {btnActive ? (
                <button
                  type='button'
                  className={css.btn_active}
                  onClick={handleChangeProgress}
                  name='is_done'
                >
                  Active
                </button>
              ) : (
                <button
                  type='button'
                  className={css.btn_not_active}
                  onClick={handleChangeProgress}
                  name='is_done'
                >
                  Not active
                </button>
              )}

              <button type='submit' name='submit' className={css.btn_submit}>
                Add task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
