import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'

const ItemTypes = {
  SUBTASK: 'subtask',
}

function SubTask({ taskId, subTask, index, deleteSubTask, moveSubTask }) {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.SUBTASK,
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
      moveSubTask(taskId, dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SUBTASK,
    item: { type: ItemTypes.SUBTASK, id: subTask.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleDelete = () => {
    deleteSubTask(taskId, subTask.id)
  }
  return (
    <div
      ref={ref}
      className='subtask-list-content'
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span>{subTask.text}</span>
      <button className='delete-subtask' onClick={handleDelete}>
        &times;
      </button>
    </div>
  )
}

SubTask.propTypes = {
  subTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  taskId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  deleteSubTask: PropTypes.func.isRequired,
  moveSubTask: PropTypes.func.isRequired,
}

export default SubTask
