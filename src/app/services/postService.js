import api from "./api";

export const createPost = async (formData) => {
  const accessToken = localStorage.getItem("accessToken"); // Retrieve the accessToken from localStorage

  return api.fetch("/posts", {
    method: "POST",
    headers: {
      "Authorization": accessToken, // Pass the token in the Authorization header
      "Content-Type": undefined, // Remove Content-Type header to let browser set it with boundary for FormData
    },
    body: formData, // Don't stringify body - FormData needs to be sent as-is
  });
};
