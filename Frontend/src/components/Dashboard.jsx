import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTask, setTasks } from '../store'

function Dashboard() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.items)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:3000/api/tasks')
        dispatch(setTasks(response.data))
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [dispatch])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`)
      dispatch(deleteTask(id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Inline CSS styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '15px'
  }

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  }

  const addButtonStyle = {
    backgroundColor: '#4a6ee0',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.3s'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  }

  const cardStyle = {
    border: '1px solid #eaeaea',
    borderRadius: '6px',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }

  const cardBodyStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333'
  }

  const cardTextStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    flexGrow: 1
  }

  const badgeStyle = (status) => ({
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: status === 'completed' ? '#28a745' : '#ffc107',
    textTransform: 'capitalize'
  })

  const cardActionsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  }

  const viewButtonStyle = {
    backgroundColor: '#4a6ee0',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.3s',
    flex: 1,
    textAlign: 'center'
  }

  const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    flex: 1,
    textAlign: 'center'
  }

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666'
  }

  const loadingStateStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={headingStyle}>Tasks Dashboard</h2>
        <Link to="/add" style={addButtonStyle}>
          Add New Task
        </Link>
      </div>

      {isLoading ? (
        <div style={loadingStateStyle}>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div style={emptyStateStyle}>
          <p>No tasks available. Click "Add New Task" to create one.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {tasks.map(task => (
            <div 
              key={task._id} 
              style={{
                ...cardStyle,
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
                }
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={cardBodyStyle}>
                <h5 style={cardTitleStyle}>{task.title}</h5>
                <p style={cardTextStyle}>{task.description}</p>
                <span style={badgeStyle(task.status)}>
                  {task.status}
                </span>
                <div style={cardActionsStyle}>
                  <Link 
                    to={`/task/${task._id}`} 
                    style={viewButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#3658c5'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4a6ee0'}
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(task._id)} 
                    style={deleteButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard