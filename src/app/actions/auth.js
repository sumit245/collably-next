import {
  loginWithPhoneAsync,
  registerUser,
  loginWithGoogleAsync,
  handleGoogleRedirectAsync,
  logoutUser,
  checkAuthStatus,
} from "../store/authslice"

export const loginWithPhone = (contactNumber) => async (dispatch) => {
  try {
    const result = await dispatch(loginWithPhoneAsync({ contactNumber }))
    if (loginWithPhoneAsync.fulfilled.match(result)) {
      return { success: true, user: result.payload }
    } else {
      return { success: false, error: result.error.message }
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred during login.",
    }
  }
}

export const register = (fullname, username, email, password, contactNumber) => async (dispatch) => {
  try {
    const result = await dispatch(registerUser({ fullname, username, email, password, contactNumber }))
    if (registerUser.fulfilled.match(result)) {
      return { success: true, username: result.payload.username }
    } else {
      return { success: false, error: result.error.message }
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred during registration.",
    }
  }
}

export const loginWithGoogle = () => async (dispatch) => {
  try {
    const result = await dispatch(loginWithGoogleAsync())
    if (loginWithGoogleAsync.fulfilled.match(result)) {
      window.location.href = result.payload.authUrl
    }
  } catch (error) {
    console.error("Google login error:", error)
  }
}

export const handleGoogleRedirect = () => async (dispatch) => {
  try {
    const result = await dispatch(handleGoogleRedirectAsync())
    if (handleGoogleRedirectAsync.fulfilled.match(result)) {
      return { success: true, username: result.payload.username, avatar: result.payload.avatar }
    } else {
      return { success: false, error: result.error.message }
    }
  } catch (error) {
    console.error("Google redirect error:", error)
    return { success: false, error: "An unexpected error occurred during Google login." }
  }
}

export const logout = () => async (dispatch) => {
  try {
    await dispatch(logoutUser())
  } catch (error) {
    console.error("Logout error:", error)
  }
}

export const checkAuth = () => async (dispatch) => {
  try {
    const result = await dispatch(checkAuthStatus())
    if (checkAuthStatus.fulfilled.match(result)) {
      return { success: true, user: result.payload }
    } else {
      return { success: false, error: result.error.message }
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return { success: false, error: "An unexpected error occurred during auth check." }
  }
}

