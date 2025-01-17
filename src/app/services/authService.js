import api from './api';

export const login = (email, password) => api.fetch('/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});

export const loginWithGoogle = () => api.fetch('/auth/google');

export const handleGoogleRedirect = () => api.fetch('/auth/google/callback');

export const logout = () => api.fetch('/logout', { method: 'POST' });

