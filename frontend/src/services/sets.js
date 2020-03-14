import axios from 'axios'
import { useState, useEffect } from 'react'

const baseURL = process.env.BASE_URL || 'https://mtg-deckbuilder-api.herokuapp.com/api'

async function getAll() {
  try {
    const response = await axios.get(`${baseURL}/sets/`)

    return response.data.data
  } catch (error) {
    return error.response.data
  }
}

const get = async (code) => {
  const response = await axios.get(`${baseURL}/sets/${code}/`)

  return response.data
}

const getCards = async (code) => {
  const response = await axios.get(`${baseURL}/sets/${code}/cards/`)

  return response.data
}

const getStandardBooster = async (code) => {
  const response = await axios.get(`${baseURL}/sets/${code}/booster/`)
  return response.data
}

const useFetchSets = () => {
  const [sets, setSets] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${baseURL}/sets/`)

        setSets(response.data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return [sets, error, isLoading]
}

const useFetchSetData = (options) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${baseURL}/sets/${options}`)

        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [options])
  return [data, error, isLoading]
}

export default { get, getAll, getCards, getStandardBooster, useFetchSetData, useFetchSets }
