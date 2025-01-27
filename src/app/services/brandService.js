import api from "./api"

export const getAllBrands = () => api.fetch("/brands")

export const getProductsByBrand = (brandId) => api.fetch(`/getallproducts?brandId=${brandId}`)

export const createReferralLink = (userId, productId, brandId) =>
  api.fetch("/createreferral", {
    method: "POST",
    body: JSON.stringify({ userId, productId, brandId }),
  })

