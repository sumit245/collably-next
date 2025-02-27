import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as authService from "../services/authService"

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user")
    if (serializedUser === null) {
      return null
    }
    return JSON.parse(serializedUser)
  } catch (err) {
    return null
  }
}

export const loginWithPhoneAsync = createAsyncThunk(
  "auth/loginWithPhone",
  async ({ contactNumber }, { rejectWithValue }) => {
    try {
   
      
      const response = await authService.loginWithPhone(contactNumber);
      
     
      
      if (response && response.user) {
       
        
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        
        return response.user;
      } else {
        console.error("Login response does not contain user data.");
        return rejectWithValue("Invalid login response");
      }
      
    } catch (error) {
      console.error("Error during phone login:", error.message);
      return rejectWithValue(error.message);
    }
  }
);


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

export const loginWithGoogleAsync = createAsyncThunk("auth/loginWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.loginWithGoogle()
    localStorage.setItem("accessToken", response.access_token)
    localStorage.setItem("user", JSON.stringify(response.user))
    return response.user
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
    return
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      return null
    }
    const response = await authService.verifyToken(token)
    localStorage.setItem("user", JSON.stringify(response.user))
    return response.user
  } catch (error) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromStorage(),
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
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.error = action.payload
      })
  },
})

export default authSlice.reducer

