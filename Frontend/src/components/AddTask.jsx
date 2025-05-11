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

  // Inline CSS styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  }

  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '25px',
    color: '#333',
    textAlign: 'center',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '15px'
  }

  const formGroupStyle = {
    marginBottom: '22px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#555'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border 0.3s',
    boxSizing: 'border-box'
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  }

  const buttonStyle = {
    backgroundColor: '#4a6ee0',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'block',
    width: '100%',
    marginTop: '10px'
  }

  const buttonHoverStyle = {
    backgroundColor: '#3658c5'
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Title</label>
          <input
            type="text"
            style={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Description</label>
          <textarea
            style={textareaStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = buttonStyle.backgroundColor;
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default AddTask
