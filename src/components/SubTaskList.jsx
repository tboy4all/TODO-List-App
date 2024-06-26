// import React from 'react';
import PropTypes from 'prop-types'
import SubTask from './SubTask'
import '../styles/main.scss'

function SubTaskList({ taskId, subTasks, deleteSubTask, moveSubTask }) {
  return (
    <div className='subtask-list'>
      {subTasks.map((subTask, index) => (
        <SubTask
          key={subTask.id}
          taskId={taskId}
          subTask={subTask}
          index={index}
          deleteSubTask={deleteSubTask}
          moveSubTask={moveSubTask}
        />
      ))}
    </div>
  )
}

SubTaskList.propTypes = {
  subTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  taskId: PropTypes.number.isRequired,
  deleteSubTask: PropTypes.func.isRequired,
  moveSubTask: PropTypes.func.isRequired,
}

export default SubTaskList
