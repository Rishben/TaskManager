import { configureStore, createSlice } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload
    },
    addTask: (state, action) => {
      state.items.push(action.payload)
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex(task => task._id === action.payload._id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task._id !== action.payload)
    }
  }
})

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
})

export default store