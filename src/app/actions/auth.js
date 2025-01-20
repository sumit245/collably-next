const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

async function fetchWithAuth(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  // Log the response and data for debugging purposes
  console.log('Response:', response);
  console.log('Data:', data);
  

  if (!response.ok) {
    // If the response is not OK, throw an error
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return data;
}

export async function login(email, password) {
  try {
    // Make a POST request to the login endpoint
    const data = await fetchWithAuth('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }), // Send email and password in the body
    });

    const { access_token, username } = data; // Destructure token and username from the response data

    // Store the token and username in localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('username', username);

    // Dispatch a storage event to sync data
    window.dispatchEvent(new Event('storage'));

    // Return the success object with username
    return { success: true, username };
  } catch (error) {
    console.error('Login error:', error); // Log any error for debugging purposes

    // Return an error object
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during login.',
    };
  }
}

export function loginWithGoogle() {
  const googleAuthUrl = new URL(`${BASE_URL}/auth/google`);
  googleAuthUrl.searchParams.append('prompt', 'select_account');
  googleAuthUrl.searchParams.append('approval_prompt', 'force');
  window.location.href = googleAuthUrl.toString(); // Redirect to Google login
}

export async function handleGoogleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const username = urlParams.get('username');
  console.log("auth user" , username)
  const avatar = urlParams.get('avatar');
  const error = urlParams.get('error');

  console.log('Google redirect params:', { token, username, avatar, error });

  if (error) {
    return { success: false, error };
  }

  if (token && username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    if (avatar) {
      localStorage.setItem('avatar', avatar);
    }
    window.dispatchEvent(new Event('storage'));
    return { success: true, username, avatar };
  }

  return { success: false, error: 'No authentication data received' };
}

export function logout() {
  // Remove the token and username from localStorage to log out
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('avatar');
  window.dispatchEvent(new Event('storage')); // Dispatch a storage event to sync data
}