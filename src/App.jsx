import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskList from './components/TaskList'
import AddTask from './components/AddTask'
import './styles/main.scss'
import initialData from './data/data.json'

function App() {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    const storedCompletedTasks = JSON.parse(
      localStorage.getItem('completedTasks')
    )

    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks)
    } else {
      setTasks(initialData.filter((task) => !task.completed))
    }

    if (storedCompletedTasks && storedCompletedTasks.length > 0) {
      setCompletedTasks(storedCompletedTasks)
    } else {
      setCompletedTasks(initialData.filter((task) => task.completed))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
  }, [tasks, completedTasks])

  const addTask = (text) => {
    const dueDate = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const newTask = {
      id: tasks.length + completedTasks.length + 1,
      text,
      dueDate,
      completed: false,
      subTasks: [],
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (taskId, updatedTask) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    )
    setTasks(newTasks)

    if (updatedTask.completed) {
      setTasks(newTasks.filter((task) => task.id !== taskId))
      setCompletedTasks([...completedTasks, updatedTask])
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setCompletedTasks(completedTasks.filter((task) => task.id !== taskId))
  }

  const addSubTask = (taskId, subTaskText) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: [
                ...task.subTasks,
                {
                  id: task.subTasks.length + 1,
                  text: subTaskText,
                  completed: false,
                },
              ],
            }
          : task
      )
    )
  }

  const deleteSubTask = (taskId, subTaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.filter(
                (subTask) => subTask.id !== subTaskId
              ),
            }
          : task
      )
    )
  }

  const moveTask = (dragIndex, hoverIndex) => {
    const dragTask = tasks[dragIndex]
    const updatedTasks = [...tasks]
    updatedTasks.splice(dragIndex, 1)
    updatedTasks.splice(hoverIndex, 0, dragTask)
    setTasks(updatedTasks)
  }

  const moveSubTask = (taskId, dragIndex, hoverIndex) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const dragSubTask = task.subTasks[dragIndex]
        const updatedSubTasks = [...task.subTasks]
        updatedSubTasks.splice(dragIndex, 1)
        updatedSubTasks.splice(hoverIndex, 0, dragSubTask)
        return { ...task, subTasks: updatedSubTasks }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        <AddTask addTask={addTask} />
        <div className='task-section'>
          <h2>Tasks - {tasks.length}</h2>
          <TaskList
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            addSubTask={addSubTask}
            deleteSubTask={deleteSubTask}
            moveTask={moveTask}
            moveSubTask={moveSubTask}
          />
        </div>
        <div className='task-section'>
          <h2>Completed - {completedTasks.length}</h2>
          <TaskList
            tasks={completedTasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            addSubTask={addSubTask}
            deleteSubTask={deleteSubTask}
            moveTask={moveTask}
            moveSubTask={moveSubTask}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default App
