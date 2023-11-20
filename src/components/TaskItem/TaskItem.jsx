import css from "./TaskItem.module.css";
import cssModal from '../AddTaskModal/AddTaskModal.module.css';
import { useState } from "react";
import { BiEdit } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { FiSave } from "react-icons/fi";
import { updateTask } from "../../operations/operations";
import { useParams } from "react-router-dom";

export default function TaskItem({
  id,
  task,
  deadline,
  is_done,
  subject,
  details,
  onDeleteTask,
}) {
  const { userId } = useParams();
  const [btnActive, setBtnActive] = useState(is_done);
  const [editData, setEditData] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({
    deadline,
    is_done,
    details,
  });

  const handleChangeProgress = (e) => {
    if (!editData) {
      return;
    }
    const { name } = e.target;
    console.log(name);
    setBtnActive((prevState) => !prevState);
    setDataToUpdate({ ...dataToUpdate, [name]: !btnActive });
  };
  const handleEditData = () => {
    setEditData((prevState) => !prevState);
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setDataToUpdate({ ...dataToUpdate, [name]: value });
  };

  //   const handleDeleteTask = () => {
  // deleteTask(userId, id)
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));
  //   }
  const handleUpdateData = () => {
    console.log(dataToUpdate);

    updateTask(userId, id, dataToUpdate)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setEditData((prevState) => !prevState);
  };

  return (
    <li id={id} className={css.list_item}>
      <button className={css.delete} type='button' onClick={() => onDeleteTask(id)}>
        <BsFillTrashFill color='white' size={25} />
      </button>
      <p className={css.text}>Subject: {subject}</p>
      <p className={css.text}> Task: {task}</p>
      <div className={css.edit_box}>
        <span className={css.text_details}>Details:</span>
        {editData ? (
          <span className={css.edit} onClick={handleUpdateData}>
            <FiSave size={25} color='white' /> Save data
          </span>
        ) : (
          <span className={css.edit} onClick={handleEditData}>
            <BiEdit size={25} color='white' /> Edit data below
          </span>
        )}
      </div>
      <textarea
        className={css.details}
        name='details'
        value={dataToUpdate.details}
        readOnly={!editData}
        onChange={handleChangeData}
      />
      <div className={css.box}>
        {!btnActive ? (
          <button
            type='button'
            className={cssModal.btn_active}
            onClick={handleChangeProgress}
            name='is_done'
            readOnly={!editData}
          >
            Active
          </button>
        ) : (
          <button
            type='button'
            className={cssModal.btn_not_active}
            onClick={handleChangeProgress}
            name='is_done'
            readOnly={!editData}
          >
            Not active
          </button>
        )}
        <input
          type='datetime-local'
          name='deadline'
          value={dataToUpdate.deadline || ""}
          className={css.deadline}
          readOnly={!editData}
          onChange={handleChangeData}
        />
      </div>
    </li>
  );
}
