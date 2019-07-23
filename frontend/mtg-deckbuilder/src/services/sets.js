import axios from "axios"
const baseURL = "/api/sets/"

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data.data
}

const get = async code => {
  const response = await axios.get(`${baseURL}${code}/`)
  return response.data
}

const getCards = async code => {
  const response = await axios.get(`${baseURL}${code}/cards/`)
  return response.data
}

const getStandardBooster = async code => {
  const response = await axios.get(`${baseURL}${code}/booster/`)
  return response.data
}

export default { get, getAll, getCards, getStandardBooster }
