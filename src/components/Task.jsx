import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import AddSubTask from './AddSubTask'
import SubTaskList from './SubTaskList'
import '../styles/main.scss'
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from 'react-icons/fa'

const ItemTypes = {
  TASK: 'task',
  SUBTASK: 'subtask',
}

function Task({
  task,
  index,
  updateTask,
  deleteTask,
  addSubTask,
  deleteSubTask,
  moveTask,
  moveSubTask,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)
  const [showSubTasks, setShowSubTasks] = useState(false)

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveTask(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { type: ItemTypes.TASK, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const toggleComplete = () => {
    updateTask(task.id, { ...task, completed: !task.completed })
  }

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedText.trim()) {
      updateTask(task.id, { ...task, text: editedText })
      setIsEditing(false)
    }
  }

  return (
    <div className='task'>
      <div
        ref={ref}
        className={` ${task.completed ? 'completed' : ''}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className='task-details'>
          <label className='custom-checkbox'>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={toggleComplete}
              className='task-checkbox'
            />
            <span className='checkmark'></span>
          </label>

          {/* task text */}
          <div className=''>
            {isEditing ? (
              <input
                type='text'
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleSave}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSave()
                }}
                autoFocus
              />
            ) : (
              <span className='task-text' onDoubleClick={handleEdit}>
                {task.text}
              </span>
            )}

            {/* calender */}
            <div className='task-content'>
              <span>
                {`tg ${
                  task.subTasks.filter((subTask) => subTask.completed).length
                }/${task.subTasks.length}`}
              </span>

              <div className='task-due-date'>
                <FaCalendarAlt />
                {task.dueDate}
              </div>
            </div>
          </div>

          {/* button */}
          <div className='task-details-button'>
            <button
              className='arrow'
              onClick={() => setShowSubTasks(!showSubTasks)}
            >
              {showSubTasks ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <button className='delete-task' onClick={handleDelete}>
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {/* sub task div */}
      <div>
        {showSubTasks && (
          <div className='subtask-container'>
            <AddSubTask taskId={task.id} addSubTask={addSubTask} />
            <div>
              <SubTaskList
                taskId={task.id}
                subTasks={task.subTasks}
                deleteSubTask={deleteSubTask}
                moveSubTask={moveSubTask}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubTask: PropTypes.func.isRequired,
  deleteSubTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  moveSubTask: PropTypes.func.isRequired,
}

export default Task
