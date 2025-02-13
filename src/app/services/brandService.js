import api from "./api"

export const getAllBrands = () => api.fetch("/brands")

export const getProductsByBrand = (brandId) => api.fetch(`/getallproducts?brandId=${brandId}`)

export const createReferralLink = (userId, productUrl) =>
  api.fetch("/createreferral", {
    method: "POST",
    body: JSON.stringify({ userId, productUrl }),
  })

  export const getAllReferrals = () => api.fetch("/referrals")

