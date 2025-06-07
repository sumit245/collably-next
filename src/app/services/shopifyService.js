import api from "./api"

export const getShopifyProducts = () => api.fetch("/fetch/shopify")

export const getShopifyProductById = (id) => api.fetch(`/shopify/product/${id}`)
