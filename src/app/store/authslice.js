import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as authService from "../services/authService"

export const loginWithPhoneAsync = createAsyncThunk(
  "auth/loginWithPhone",
  async ({ contactNumber }, { rejectWithValue }) => {
    try {
      const response = await authService.loginWithPhone(contactNumber)
      localStorage.setItem("accessToken", response.access_token)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullname, username, email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.register(fullname, username, email, password)
      localStorage.setItem("accessToken", response.access_token)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const loginWithGoogleAsync = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.loginWithGoogle()
    localStorage.setItem("accessToken", response.access_token)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const handleGoogleRedirectAsync = createAsyncThunk(
  "auth/handleGoogleRedirect",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.handleGoogleRedirect()
      localStorage.setItem("accessToken", response.access_token)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authService.logout()
    localStorage.removeItem("accessToken")
    return
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginWithPhoneAsync.pending, (state) => {
      state.isLoading = true
    })
    .addCase(loginWithPhoneAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.error = null
    })
    .addCase(loginWithPhoneAsync.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(loginWithGoogleAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginWithGoogleAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginWithGoogleAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(handleGoogleRedirectAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(handleGoogleRedirectAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(handleGoogleRedirectAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.error = null
      })
  },
})

export default authSlice.reducer

