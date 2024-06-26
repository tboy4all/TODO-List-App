// import React from 'react';
import PropTypes from 'prop-types'
import Task from './Task'
import '../styles/main.scss'

function TaskList({
  tasks,
  updateTask,
  deleteTask,
  addSubTask,
  deleteSubTask,
  moveTask,
  moveSubTask,
}) {
  return (
    <div className='task-list'>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          index={index}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          addSubTask={addSubTask}
          deleteSubTask={deleteSubTask}
          moveTask={moveTask}
          moveSubTask={moveSubTask}
        />
      ))}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubTask: PropTypes.func.isRequired,
  deleteSubTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  moveSubTask: PropTypes.func.isRequired,
}

export default TaskList
