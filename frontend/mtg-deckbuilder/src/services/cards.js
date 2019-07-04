import axios from 'axios'
const baseURL = '/api/cards/'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

export default { getAll }