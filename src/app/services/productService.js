import api from "./api"

export const getProducts = () => api.fetch("/getallproducts")

export const getProductById = (id) => api.fetch(`/product/${id}`)

