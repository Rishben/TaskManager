import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addTask } from '../store'

function AddTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post('https://taskmanager-be-npte.onrender.com/api/tasks', {
      title,
      description
    })
    dispatch(addTask(response.data))
    navigate('/')
  }

  // Inline CSS styles with updated color scheme and design
  const containerStyle = {
    maxWidth: '650px',
    margin: '50px auto',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#f8f9fe',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  }

  const headingStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#2d3748',
    textAlign: 'center',
    padding: '0 0 15px 0'
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

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  }

  const inputFocusStyle = {
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)'
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical'
  }

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    gap: '15px'
  }

  const buttonStyle = {
    flex: '1',
    backgroundColor: '#6366f1', // Indigo color
    color: 'white',
    border: 'none',
    padding: '14px 20px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'white',
    color: '#4a5568',
    border: '2px solid #e2e8f0'
  }

  const cardHeaderStyle = {
    backgroundColor: '#6366f1', // Indigo background header
    margin: '-35px -35px 25px -35px',
    padding: '25px 35px',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
  }

  const headerTextStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0'
  }

  return (
    <div style={containerStyle}>
      <div style={cardHeaderStyle}>
        <h2 style={headerTextStyle}>Create New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Task Title</label>
          <input
            type="text"
            style={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
            onFocus={(e) => {
              Object.assign(e.target.style, inputFocusStyle);
            }}
            onBlur={(e) => {
              e.target.style.borderColor = inputStyle.border.split(' ')[2];
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Task Description</label>
          <textarea
            style={textareaStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about this task..."
            required
            onFocus={(e) => {
              Object.assign(e.target.style, inputFocusStyle);
            }}
            onBlur={(e) => {
              e.target.style.borderColor = inputStyle.border.split(' ')[2];
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={buttonContainerStyle}>
          <button 
            type="button" 
            style={cancelButtonStyle}
            onClick={() => navigate('/')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#4f46e5';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#6366f1';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask