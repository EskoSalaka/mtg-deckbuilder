import axios from 'axios'

const baseURL = process.env.BASE_URL || 'https://mtg-deckbuilder-api.herokuapp.com/api'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data.data
}

const get = async (id) => {
  const response = await axios.get(`${baseURL}/cards/${id}/`)
  return response.data
}

const getBySet = async (setCode, collector_number) => {
  const response = await axios.get(`${baseURL}/cards/${setCode}/${collector_number}/`)

  return response.data
}

export default { get, getBySet, getAll }
