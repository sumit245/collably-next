export async function login(email, password) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials.");
    }
    const data = await response.json();
    const { token, username } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    window.dispatchEvent(new Event("storage"));

    return { success: true, username };
  } catch (error) {
    return { success: false, error: error.message || "An unexpected error occurred during login." };
  }
}

export function loginWithGoogle() {
  const googleAuthUrl = new URL("http://127.0.0.1:5000/api/auth/google");
  googleAuthUrl.searchParams.append('prompt', 'select_account');
  googleAuthUrl.searchParams.append('approval_prompt', 'force');
  window.location.href = googleAuthUrl.toString();
}

export async function handleGoogleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const username = urlParams.get('username');
  const avatar = urlParams.get('avatar');
  const error = urlParams.get('error');

  console.log("Google redirect params:", { token, username, avatar, error });

  if (error) {
    return { success: false, error };
  }

  if (token && username) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
    window.dispatchEvent(new Event("storage"));
    return { success: true, username, avatar };
  }

  return { success: false, error: "No authentication data received" };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("avatar");
  window.dispatchEvent(new Event("storage"));
}

