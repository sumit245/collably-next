import api from "./api"

export const getBlogs = async () => {
  return api.fetch("/view_blogs", {
    method: "GET",
  })
}

export const getBlogById = async (id) => {
  return api.fetch(`/view_blogs/${id}`, {
    method: "GET",
  })
}

export const createBlog = async (blogData) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("No access token found.")
  }

  return api.fetch("/upload", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  })
}

export const deleteBlog = async (id) => {
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    throw new Error("No access token found.")
  }

  return api.fetch(`/delete_blogs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: accessToken,
    },
  })
}

