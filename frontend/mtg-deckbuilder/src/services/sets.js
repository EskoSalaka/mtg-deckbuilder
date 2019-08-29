import axios from "axios"
import { useState, useEffect } from "react"
const baseURL = "http://localhost:5000/api/sets/"

async function getAll() {
  try {
    const response = await axios.get(baseURL)

    return response.data.data
  } catch (error) {
    return error.response.data
  }
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

const useFetchSetData = options => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("Sets")

    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${baseURL}${options}`)
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return { data, error, isLoading }
}

export default { get, getAll, getCards, getStandardBooster, useFetchSetData }
