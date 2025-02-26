import api from "./api"

export const getAllCreators = () => api.fetch("/user")