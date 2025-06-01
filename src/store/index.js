import { configureStore } from '@reduxjs/toolkit'
import prodSlice from './prodRoute'
import authSlice from './authReducer'

const store = configureStore({
  reducer: {
    prod: prodSlice,
    auth: authSlice,
  },
})

export default store;