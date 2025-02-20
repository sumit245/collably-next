import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentMedia: null,
  formData: {
    product: '',
    visibility: '',
    audience: '',
    ageRestriction: ''
  }
}

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setCurrentMedia: (state, action) => {
      state.currentMedia = action.payload
    },
    clearCurrentMedia: (state) => {
      state.currentMedia = null
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    clearFormData: (state) => {
      state.formData = initialState.formData
    }
  }
})

export const { setCurrentMedia, clearCurrentMedia, updateFormData, clearFormData } = mediaSlice.actions
export default mediaSlice.reducer
