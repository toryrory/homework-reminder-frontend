import { FaPlus } from 'react-icons/fa';
import css from './AddTaskBtn.module.css'

export default function AddTaskBtn({onClick}) {
  return (
      <>
          <button id='open_modal' type='button' onClick={onClick} className={css.main_btn}><FaPlus size={50} color='#ffffff'/>Add task</button>
      </>
  )
}
