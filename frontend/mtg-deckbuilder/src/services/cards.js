import axios from "axios"
const baseURL = "/api/cards/"

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data.data
}

const get = async id => {
  const response = await axios.get(`${baseURL}${id}/`)
  return response.data
}

export default { get, getAll }
