import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/main.scss'
import { FaPlus } from 'react-icons/fa6';

function AddTask({ addTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addTask(text)
      setText('')
    }
  }

  return (
    <div className='add'>
    <form className='add-task' onSubmit={handleSubmit}>
      <div className="input-container">
        <button type="submit">
          <FaPlus className='icon' />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
      </div>
    </form>
    </div>
  )
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default AddTask
