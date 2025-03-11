import api from "./api"

export const loginWithPhone = (contactNumber) =>
  api.fetch("/login", {
    method: "POST",
    body: JSON.stringify({ contactNumber }),
  })

export const loginWithGoogle = () => api.fetch("/auth/google")

export const handleGoogleRedirect = () => api.fetch("/auth/google/callback")

export const logout = () =>
  api.fetch("/logout", {
    method: "POST",
  })

export const register = (fullname, username, email, password, contactNumber) =>
  api.fetch("/register", {
    method: "POST",
    body: JSON.stringify({ fullname, username, email, password, contactNumber }),
  })

export const updateUser = (userData) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("No access token found.")
  }

  return api.fetch("/user", {
    method: "PATCH",
    headers: {
      Authorization: accessToken,
    },
    body: JSON.stringify(userData),
  })
}

