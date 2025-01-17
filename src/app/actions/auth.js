import { loginUser, loginWithGoogleAsync, handleGoogleRedirectAsync, logoutUser } from '../store/authslice';

export const login = (email, password) => async (dispatch) => {
  try {
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      return { success: true, username: result.payload.username };
    } else {
      return { success: false, error: result.error.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during login.',
    };
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    const result = await dispatch(loginWithGoogleAsync());
    if (loginWithGoogleAsync.fulfilled.match(result)) {
      window.location.href = result.payload.authUrl;
    }
  } catch (error) {
    console.error('Google login error:', error);
  }
};

export const handleGoogleRedirect = () => async (dispatch) => {
  try {
    const result = await dispatch(handleGoogleRedirectAsync());
    if (handleGoogleRedirectAsync.fulfilled.match(result)) {
      return { success: true, username: result.payload.username, avatar: result.payload.avatar };
    } else {
      return { success: false, error: result.error.message };
    }
  } catch (error) {
    console.error('Google redirect error:', error);
    return { success: false, error: 'An unexpected error occurred during Google login.' };
  }
};

export const logout = () => async (dispatch) => {
  try {
    await dispatch(logoutUser());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

