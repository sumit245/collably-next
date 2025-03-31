import {
  loginWithPhoneAsync,
  registerUser,
  loginWithGoogleAsync,
  handleGoogleRedirectAsync,
  logoutUser,
  checkAuthStatus,
  generateOTPAsync,
  verifyOTPAsync,
  updateUserAsync,
} from "../store/authslice"

export const loginWithPhone = (contactNumber) => async (dispatch) => {
  try {
    
    const result = await dispatch(loginWithPhoneAsync({ contactNumber }));
  

    if (loginWithPhoneAsync.fulfilled.match(result)) {
   
      return { success: true, user: result.payload };
    } else {
      
      return { success: false, error: result.error.message };
    }
  } catch (error) {
  
    return {
      success: false,
      error: error.message || "An unexpected error occurred during login.",
    };
  }
};


export const generateOTP = (contactNumber) => async (dispatch) => {
  try {
    const result = await dispatch(generateOTPAsync({ contactNumber }))
    if (generateOTPAsync.fulfilled.match(result)) {
      return { success: true }
    } else {
      return { success: false, error: result.error.message }
    }
  } catch (error) {
    console.error("Generate OTP error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred while sending OTP.",
    }
  }
}

export const verifyOTP = (contactNumber, otp) => async (dispatch) => {
  try {
    const result = await dispatch(verifyOTPAsync({ contactNumber, otp }))
    if (verifyOTPAsync.fulfilled.match(result)) {
      const loginResult = await dispatch(loginWithPhoneAsync({ contactNumber }))
      if (loginWithPhoneAsync.fulfilled.match(loginResult)) {
        return { success: true, user: loginResult.payload }
      } else {
        return { success: false, error: loginResult.error.message }
      }
    } else {
      return { success: false, error: result.error.message }
    }
  } catch (error) {
    console.error("Verify OTP error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred while verifying OTP.",
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

export const updateUser = (userData) => async (dispatch) => {
  try {
    await dispatch(updateUserAsync(userData)).unwrap()
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

