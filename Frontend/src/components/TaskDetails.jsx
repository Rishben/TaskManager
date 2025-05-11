import axios from 'axios'
import React,{ useEffect, useState } from 'react'
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

  // Inline CSS styles
  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  }

  const headerStyle = {
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '15px',
    marginBottom: '25px',
    position: 'relative'
  }

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0'
  }

  const metaInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15px'
  }

  const timestampStyle = {
    fontSize: '14px',
    color: '#888',
    fontStyle: 'italic'
  }

  const descriptionContainerStyle = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    borderLeft: '4px solid #4a6ee0'
  }

  const descriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#444',
    whiteSpace: 'pre-wrap'
  }

  const formGroupStyle = {
    marginBottom: '25px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#555'
  }

  const selectStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border 0.3s, box-shadow 0.3s'
  }

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '30px'
  }

  const backButtonStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    display: 'inline-block'
  }

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    flexDirection: 'column',
    gap: '20px'
  }

  const errorStyle = {
    padding: '20px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    borderRadius: '4px',
    marginBottom: '20px'
  }

  const getBadgeStyle = (status) => {
    const colors = {
      'pending': { bg: '#ffebc2', text: '#856404' },
      'in-progress': { bg: '#c5e1f9', text: '#0d47a1' },
      'completed': { bg: '#d4edda', text: '#155724' }
    }
    
    const defaultColors = { bg: '#e9ecef', text: '#343a40' }
    const colorSet = colors[status] || defaultColors
    
    return {
      display: 'inline-block',
      padding: '8px 16px',
      borderRadius: '20px',
      backgroundColor: colorSet.bg,
      color: colorSet.text,
      fontWeight: 'bold',
      fontSize: '14px',
      textTransform: 'capitalize'
    }
  }

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={{ fontSize: '18px', color: '#666' }}>Loading task details...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>{error}</div>
        <button 
          onClick={() => navigate('/')} 
          style={backButtonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (!task) return null

  return (
    <div style={containerStyle}>
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
      
      <div style={descriptionContainerStyle}>
        <p style={descriptionStyle}>{task.description}</p>
      </div>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Update Status:</label>
        <select
          style={selectStyle}
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
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
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default TaskDetails
