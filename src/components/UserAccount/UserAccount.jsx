import AddTaskBtn from "../AddTaskBtn/AddTaskBtn";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import css from "./UserAccount.module.css";
import { useState, useEffect } from "react";
import TasksList from "../TasksList/TasksList";
import {
  getUserTasks,
  deleteTask,
  addTask,
  logOut,
} from "../../operations/operations";
import { useParams } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getUserTasks(userId)
      .then((data) => setTasks(data))
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          navigate('/');
        }
      });
  }, [userId, modalOpen]);

  const handleDeleteTask = (taskId) => {
    deleteTask(userId, taskId)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setTasks(tasks.filter(({ id }) => id !== taskId));
  };
  const handleModalAction = (e) => {
    if (e.target.id === "overlay") {
      setModalOpen((prevState) => !prevState);
    } else if (e.target.name === "close_modal") {
      setModalOpen((prevState) => !prevState);
    } else if (e.target.id === "open_modal") {
      setModalOpen((prevState) => !prevState);
    }
  };
  const closeModal = (data) => {
    addTask(userId, data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setModalOpen((prevState) => !prevState);
    getUserTasks(userId)
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  };
  const handleLogout = () => {
    logOut()
      .then((data) => {
        if (data.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  const userName = localStorage.getItem("name");
  return (
    <>
      <header className={css.block}>
        <p className={css.title}>{`Hello ${userName}!`}</p>
        <button className={css.logout} type='button' onClick={handleLogout}>
          <RiLogoutBoxLine
            style={{ pointerEvents: "none" }}
            color='white'
            size={35}
          />
        </button>
      </header>
      <AddTaskBtn onClick={handleModalAction} />
      {modalOpen && (
        <AddTaskModal onClick={handleModalAction} closeModal={closeModal} />
      )}
      {tasks?.length > 0 && (
        <TasksList tasks={tasks} onDeleteTask={handleDeleteTask} />
      )}
    </>
  );
}
