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
        const response = await axios.get('https://taskmanager-be-npte.onrender.com/api/tasks')
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
      await axios.delete(`https://taskmanager-be-npte.onrender.com/api/tasks/${id}`)
      dispatch(deleteTask(id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Responsive breakpoints
  const getGridColumns = () => {
    const width = window.innerWidth
    if (width < 640) return '1fr'
    if (width < 960) return 'repeat(2, 1fr)'
    return 'repeat(auto-fill, minmax(320px, 1fr))'
  }

  // Updated inline CSS styles with the new color scheme
  const containerStyle = {
    maxWidth: '1280px',
    margin: '50px auto',
    padding: '0 20px',  // Allow side padding for mobile
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  }

  const cardContainerStyle = {
    backgroundColor: '#f8f9fe',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 35px',
    backgroundColor: '#6366f1',
    color: 'white',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
  }

  const headingStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: 'white',
    margin: 0
  }

  const addButtonStyle = {
    backgroundColor: 'white',
    color: '#6366f1',
    border: 'none',
    padding: '10px 20px',
    fontSize: '15px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
  }

  const contentStyle = {
    padding: '30px 35px'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: getGridColumns(),
    gap: '25px'
  }

  const cardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  }

  const cardBodyStyle = {
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#2d3748'
  }

  const cardTextStyle = {
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '15px',
    flexGrow: 1,
    lineHeight: '1.5'
  }

  const badgeStyle = (status) => ({
    display: 'inline-block',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: status === 'completed' ? '#10b981' : '#f59e0b',
    textTransform: 'capitalize'
  })

  const cardActionsStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '18px'
  }

  const viewButtonStyle = {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    flex: 1,
    textAlign: 'center',
    fontWeight: '500'
  }

  const deleteButtonStyle = {
    backgroundColor: 'white',
    color: '#f43f5e',
    border: '1px solid #f43f5e',
    padding: '10px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    textAlign: 'center',
    fontWeight: '500'
  }

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#4a5568'
  }

  const loadingStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#4a5568'
  }

  const emptyStateIconStyle = {
    fontSize: '48px',
    marginBottom: '15px',
    color: '#cbd5e0'
  }

  // Add event listener for window resize to update grid columns
  useEffect(() => {
    const handleResize = () => {
      const gridElement = document.getElementById('task-grid')
      if (gridElement) {
        gridElement.style.gridTemplateColumns = getGridColumns()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={containerStyle}>
      <div style={cardContainerStyle}>
        <div style={headerStyle}>
          <h2 style={headingStyle}>Tasks Dashboard</h2>
          <Link 
            to="/add" 
            style={addButtonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Add New Task
          </Link>
        </div>

        <div style={contentStyle}>
          {isLoading ? (
            <div style={loadingStateStyle}>
              <div style={emptyStateIconStyle}>⌛</div>
              <p>Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={emptyStateIconStyle}>📋</div>
              <p>No tasks available. Click "Add New Task" to create one.</p>
            </div>
          ) : (
            <div id="task-grid" style={gridStyle}>
              {tasks.map(task => (
                <div 
                  key={task._id} 
                  style={cardStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.08)';
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
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#4f46e5';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#6366f1';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        View Details
                      </Link>
                      <button 
                        onClick={() => handleDelete(task._id)} 
                        style={deleteButtonStyle}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#fff1f2';
                          e.target.style.color = '#e11d48';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.color = '#f43f5e';
                        }}
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
      </div>
    </div>
  )
}

export default Dashboard