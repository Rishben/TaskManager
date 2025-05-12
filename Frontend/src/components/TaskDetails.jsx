import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTask } from '../store'

function TaskDetails() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://taskmanager-be-npte.onrender.com/api/tasks/${id}`)
        setTask(response.data)
      } catch (err) {
        setError('Failed to load task details')
        console.error('Error fetching task:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTask()
  }, [id])

  const handleStatusChange = async (status) => {
    try {
      const response = await axios.put(`https://taskmanager-be-npte.onrender.com/api/tasks/${id}`, {
        ...task,
        status
      })
      dispatch(updateTask(response.data))
      setTask(response.data)
    } catch (err) {
      console.error('Error updating task status:', err)
    }
  }

  // Inline CSS styles with updated color scheme to match other components
  const containerStyle = {
    maxWidth: '850px',
    margin: '50px auto',
    padding: '0 20px', // Responsive padding
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  }

  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#f8f9fe',
    overflow: 'hidden'
  }

  const headerStyle = {
    backgroundColor: '#6366f1', // Indigo color to match other components
    padding: '25px 35px',
    color: 'white',
    position: 'relative',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
  }

  const contentStyle = {
    padding: '30px 35px'
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: 'white',
    margin: '0 0 10px 0'
  }

  const metaInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // For responsive design
    gap: '10px',
    marginTop: '10px'
  }

  const timestampStyle = {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.85)',
    fontStyle: 'italic'
  }

  const descriptionContainerStyle = {
    marginBottom: '30px',
    padding: '25px',
    backgroundColor: 'white',
    borderRadius: '10px',
    borderLeft: '4px solid #6366f1', // Updated to indigo
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  }

  const descriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#4a5568',
    whiteSpace: 'pre-wrap'
  }

  const formGroupStyle = {
    marginBottom: '28px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#4a5568',
    letterSpacing: '0.5px'
  }

  const selectStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    appearance: 'none', // Remove default styling
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    backgroundSize: '16px'
  }

  const selectFocusStyle = {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)'
  }

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
    flexWrap: 'wrap' // For responsiveness
  }

  const backButtonStyle = {
    backgroundColor: 'white',
    color: '#4a5568',
    border: '2px solid #e2e8f0',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const updateButtonStyle = {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px', 
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: '1',
    maxWidth: '200px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    flexDirection: 'column',
    gap: '20px'
  }

  const loadingIconStyle = {
    fontSize: '48px',
    marginBottom: '15px',
    color: '#cbd5e0'
  }

  const errorStyle = {
    padding: '25px',
    backgroundColor: '#fee2e2',
    color: '#ef4444',
    borderRadius: '10px',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  }

  const errorIconStyle = {
    fontSize: '24px'
  }

  const getBadgeStyle = (status) => {
    const colors = {
      'pending': { bg: '#fef3c7', text: '#d97706' }, // Amber
      'in-progress': { bg: '#dbeafe', text: '#2563eb' }, // Blue
      'completed': { bg: '#d1fae5', text: '#10b981' } // Emerald
    }
    
    const defaultColors = { bg: '#e9ecef', text: '#343a40' }
    const colorSet = colors[status] || defaultColors
    
    return {
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: '20px',
      backgroundColor: colorSet.bg,
      color: colorSet.text,
      fontWeight: '600',
      fontSize: '14px',
      textTransform: 'capitalize'
    }
  }

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={loadingStyle}>
            <div style={loadingIconStyle}>⌛</div>
            <div style={{ fontSize: '18px', color: '#4a5568' }}>Loading task details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={contentStyle}>
            <div style={errorStyle}>
              <span style={errorIconStyle}>⚠️</span>
              {error}
            </div>
            <button 
              onClick={() => navigate('/')} 
              style={backButtonStyle}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!task) return null

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{task.title}</h2>
          <div style={metaInfoStyle}>
            <span style={getBadgeStyle(task.status)}>{task.status}</span>
            {task.createdAt && (
              <span style={timestampStyle}>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        <div style={contentStyle}>
          <div style={descriptionContainerStyle}>
            <p style={descriptionStyle}>{task.description}</p>
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Update Status:</label>
            <select
              style={selectStyle}
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              onFocus={(e) => {
                Object.assign(e.target.style, selectFocusStyle);
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div style={buttonContainerStyle}>
            <button 
              onClick={() => navigate('/')} 
              style={backButtonStyle}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate('/add')} 
              style={updateButtonStyle}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4f46e5';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#6366f1';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails