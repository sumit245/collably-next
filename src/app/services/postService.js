import api from "./api"

export const createPost = async (formData) => {
  return api.fetch("/posts", {
    method: "POST",
    headers: {
      // Remove Content-Type header to let browser set it with boundary for FormData
      "Content-Type": undefined,
    },
    // Don't stringify body - FormData needs to be sent as-is
    body: formData,
  })
}

