import TaskItem from "../TaskItem/TaskItem";
import css from './TasksList.module.css';

export default function TasksList({ tasks, onDeleteTask }) {
  return (
    <ul className={css.list}>
      {tasks.map(({ id, subject, deadline, task, details, is_done }) => (
        <TaskItem
          key={id}
          id={id}
          subject={subject}
          deadline={deadline}
          details={details}
          task={task}
          is_done={is_done}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}
