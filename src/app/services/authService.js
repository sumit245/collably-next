import api from "./api"
import apiUser from "./apiUser"


export const generateOTP = (contactNumber) =>
  api.fetch("/generate_otp", {
    method: "POST",
    body: JSON.stringify({ contactNumber }),
  })

export const verifyOTP = (contactNumber, otp) =>
  api.fetch("/verify_otp", {
    method: "POST",
    body: JSON.stringify({ contactNumber, otp }),
  })

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

export const register = (fullname, username, email, password, contactNumber, avatar) => {
  const formData = new FormData()
  formData.append("fullname", fullname)
  formData.append("username", username)
  formData.append("email", email)
  formData.append("password", password)
  formData.append("contactNumber", contactNumber)

  // Only append avatar if it exists and is a File object
  if (avatar && avatar instanceof File) {
    formData.append("avatar", avatar)
  }

  return apiUser.fetch("/register", {
    method: "POST",
    body: formData,
  })
}

// export const updateUser = (userData) => {
//   const accessToken = localStorage.getItem("accessToken")

//   if (!accessToken) {
//     throw new Error("No access token found.")
//   }

//   const formData = new FormData()

//   // Append all userData fields to formData
//   Object.keys(userData).forEach((key) => {
//     // Special handling for avatar file
//     if (key === "avatar" && userData[key] instanceof File) {
//       formData.append("avatar", userData[key])
//     } else {
//       formData.append(key, userData[key])
//     }
//   })

//   return apiUser.fetch("/user", {
//     method: "PATCH",
//     headers: {
//       Authorization: accessToken,
//     },
//     body: formData,
//   })
// }
export const updateUser = (userData) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("No access token found.")
  }

  const formData = new FormData()

  // Append all userData fields to formData
  Object.keys(userData).forEach((key) => {
    // Special handling for avatar file
    if (key === "avatar" && userData[key] instanceof File) {
      formData.append("avatar", userData[key])
    } else if (key !== "avatar" || (key === "avatar" && typeof userData[key] === "string")) {
      // Only append non-avatar fields or avatar if it's a string URL
      formData.append(key, userData[key])
    }
  })

  // Log the FormData contents for debugging
  console.log("Update User FormData contents:")
  for (const pair of formData.entries()) {
    console.log(pair[0] + ": " + (pair[1] instanceof File ? "File: " + pair[1].name : pair[1]))
  }

  // The endpoint might be different - check your backend API
  return apiUser.fetch("/user", {
    method: "PATCH",
    headers: {
      Authorization: accessToken,
    },
    body: formData,
  })
}