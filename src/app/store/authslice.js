import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as authService from "../services/authService"

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user")
    return serializedUser ? JSON.parse(serializedUser) : null
  } catch (err) {
    return null
  }
}

export const generateOTPAsync = createAsyncThunk(
  "auth/generateOTP",
  async ({ contactNumber }, { rejectWithValue }) => {
    try {
      const response = await authService.generateOTP(contactNumber);
      console.log("OTP API Response:", response); // ✅ Console log to check response
      return response;
    } catch (error) {
      console.error("OTP API Error:", error.message); // ✅ Console log for errors
      return rejectWithValue(error.message);
    }
  }
);


export const verifyOTPAsync = createAsyncThunk(
  "auth/verifyOTP",
  async ({ contactNumber, otp }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOTP(contactNumber, otp)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const loginWithPhoneAsync = createAsyncThunk(
  "auth/loginWithPhone",
  async ({ contactNumber }, { rejectWithValue }) => {
    try {
      const response = await authService.loginWithPhone(contactNumber)

      if (response && response.user) {
        localStorage.setItem("accessToken", response.access_token)
        localStorage.setItem("user", JSON.stringify(response.user))
        return response.user
      } else {
        return rejectWithValue("Invalid login response")
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullname, username, email, password, contactNumber }, { rejectWithValue }) => {
    try {
      const response = await authService.register(fullname, username, email, password, contactNumber)
      localStorage.setItem("accessToken", response.access_token)
      localStorage.setItem("user", JSON.stringify(response.user))
      return response.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateUserAsync = createAsyncThunk("auth/updateUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.updateUser(userData)
    // Update the user in localStorage with the updated data
    if (response && response.user) {
      localStorage.setItem("user", JSON.stringify(response.user))
      return response.user
    }
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const loginWithGoogleAsync = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.loginWithGoogle()
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
      localStorage.setItem("user", JSON.stringify(response.user))
      return response.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authService.logout()
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    return null
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (_, { rejectWithValue }) => {
  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    return rejectWithValue("Failed to load user from local storage.")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromStorage(),
    isLoading: false,
    error: null,
    otpSent: false,
    otpVerified: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate OTP
      .addCase(generateOTPAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(generateOTPAsync.fulfilled, (state) => {
        state.isLoading = false
        state.otpSent = true
        state.error = null
      })
      .addCase(generateOTPAsync.rejected, (state, action) => {
        state.isLoading = false
        state.otpSent = false
        state.error = action.payload
      })

      // Verify OTP
      .addCase(verifyOTPAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyOTPAsync.fulfilled, (state) => {
        state.isLoading = false
        state.otpVerified = true
        state.error = null
      })
      .addCase(verifyOTPAsync.rejected, (state, action) => {
        state.isLoading = false
        state.otpVerified = false
        state.error = action.payload
      })

      // Login with Phone
      .addCase(loginWithPhoneAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginWithPhoneAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
        state.otpSent = false
        state.otpVerified = false
      })
      .addCase(loginWithPhoneAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Register
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

      // Update User
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Login with Google
      .addCase(loginWithGoogleAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginWithGoogleAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(loginWithGoogleAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Handle Google Redirect
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

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.error = null
        state.otpSent = false
        state.otpVerified = false
      })

      // Check Auth Status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload
        state.error = null
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.user = null
        state.error = action.payload
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer

