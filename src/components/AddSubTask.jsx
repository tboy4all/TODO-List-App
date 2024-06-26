import { useState } from 'react'
import PropTypes from 'prop-types'
import { FaPlus } from 'react-icons/fa6';

function AddSubTask({ taskId, addSubTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addSubTask(taskId, text)
      setText('')
    }
  }

  return (
    <form className='add-subtask' onSubmit={handleSubmit}>
      <div className="input-container">
        <button type="submit">
          <FaPlus className='icon' />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a sub-task"
        />
      </div>
    </form>
  )
}

AddSubTask.propTypes = {
  taskId: PropTypes.number.isRequired,
  addSubTask: PropTypes.func.isRequired,
}

export default AddSubTask
