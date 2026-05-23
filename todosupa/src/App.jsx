import { useState } from 'react'

function App() {
  // 1. Initial State: Direct local storage se check karein (Never removes on refresh)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('my_ui_todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  
  const [task, setTask] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodoId, setCurrentTodoId] = useState(null)

  // 2. Todo Add ya Update karne ka function
  const handleSubmit = () => {
    if (!task.trim()) return

    let updatedTodos = []

    if (isEditing) {
      updatedTodos = todos.map((todo) =>
        todo.id === currentTodoId ? { ...todo, task: task } : todo
      )
      setIsEditing(false)
      setCurrentTodoId(null)
    } else {
      const newTodo = {
        id: Date.now(),
        task: task
      }
      updatedTodos = [...todos, newTodo]
    }

    setTodos(updatedTodos)
    localStorage.setItem('my_ui_todos', JSON.stringify(updatedTodos))
    setTask('')
  }

  // 3. Edit shuru karne ke liye
  const startEdit = (todo) => {
    setIsEditing(true)
    setCurrentTodoId(todo.id)
    setTask(todo.task)
  }

  // 4. Delete karne ke liye
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem('my_ui_todos', JSON.stringify(updatedTodos))

    if (currentTodoId === id) {
      setIsEditing(false)
      setTask('')
    }
  }

  return (
    <div style={{ 
      backgroundColor: '#09090b', // Deep Matte Black Background
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start',
      paddingTop: '80px',
      fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundColor: '#18181b', // Dark Slate Card Container
        padding: '40px 35px', 
        width: '100%', 
        maxWidth: '500px', 
        borderRadius: '16px', // Modern Smooth Borders
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        border: '1px solid #27272a', // Subtle inner glass border
        boxSizing: 'border-box'
      }}>
        
        {/* Main Heading */}
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '36px', 
          fontWeight: '800', 
          marginBottom: '8px', 
          color: '#ffffff', // Clean White Title
          letterSpacing: '-1px',
          marginTop: '0px'
        }}>
          TO DO List
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#a1a1aa',
          fontSize: '14px',
          marginTop: '0px',
          marginBottom: '35px'
        }}>
          Keep track of your tasks beautifully.
        </p>

        {/* Input Field Area */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '14px 16px', 
              fontSize: '16px', 
              borderRadius: '8px', 
              border: isEditing ? '2px solid #f97316' : '1px solid #3f3f46', // Highlight border on edit
              boxSizing: 'border-box',
              outline: 'none',
              backgroundColor: '#27272a', // Input inside dark container
              color: '#ffffff',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSubmit} 
          style={{ 
            width: '100%', // Modern full-width alignment
            padding: '12px 20px', 
            fontSize: '15px', 
            fontWeight: '600',
            cursor: 'pointer', 
            backgroundColor: isEditing ? '#f97316' : '#ffffff', // Pure white primary button
            color: isEditing ? '#ffffff' : '#09090b', 
            border: 'none', 
            borderRadius: '8px',
            marginBottom: '35px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(255,255,255,0.05)'
          }}
        >
          {isEditing ? '✓ Update Task Description' : '+ Add New Task'}
        </button>

        {/* Todos List Items */}
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {todos.map((todo) => {
            const isThisItemEditing = currentTodoId === todo.id;
            return (
              <li 
                key={todo.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '16px 20px',
                  backgroundColor: '#27272a', // Distinct card items
                  marginBottom: '12px',
                  borderRadius: '8px',
                  border: isThisItemEditing ? '1px solid #f97316' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  color: isThisItemEditing ? '#f97316' : '#f4f4f5',
                  flex: 1,
                  paddingRight: '10px',
                  wordBreak: 'break-word'
                }}>
                  {todo.task}
                </span>
                
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {/* Edit Button */}
                  <button 
                    onClick={() => startEdit(todo)} 
                    style={{ 
                      backgroundColor: '#3f3f46', // Monochromatic elegant grey 
                      color: '#f4f4f5', 
                      border: 'none', 
                      padding: '8px 14px', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Edit
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => deleteTodo(todo.id)} 
                    style={{ 
                      backgroundColor: '#742a2a', // Velvet deep red theme for destruction action
                      color: '#fca5a5', 
                      border: 'none', 
                      padding: '8px 14px', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {todos.length === 0 && (
          <p style={{ color: '#71717a', textAlign: 'center', marginTop: '25px', fontSize: '15px' }}>
            
          </p>
          
        )}
      </div>
    </div>
  )
}

export default App