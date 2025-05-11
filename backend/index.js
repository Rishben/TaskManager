import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Task } from './models/Task.js'

const app = express()
const PORT = 3000

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json())

mongoose.connect('mongodb+srv://nikhil20th65:y4yEH0fbF6OkbRAt@taskmanagement.aptou00.mongodb.net/')

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
