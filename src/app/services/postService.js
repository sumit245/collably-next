import api from "./api"

export const createPost = async (formData) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("No access token found.")
  }

  return api.fetch("/posts", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
}

