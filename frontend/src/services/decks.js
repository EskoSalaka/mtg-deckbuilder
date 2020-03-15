import axios from 'axios'
import { useEffect, useState } from 'react'
import authService from './auth'
const baseURL = 'https://mtg-deckbuilder-api.herokuapp.com/api'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data.data
}

const get = async (id) => {
  const response = await axios.get(`${baseURL}/decks/${id}/`)
  return response.data
}

const getBySet = async (setCode, collector_number) => {
  const response = await axios.get(`${baseURL}/decks/${setCode}/${collector_number}/`)

  return response.data
}

const create = async (boosters) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/decks/create`,
      data: boosters,
      headers: {
        Authorization: `Bearer ${authService.getAuthToken()}`
      }
    })
    console.log(response)

    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

const useGetDeck = (id) => {
  const [deck, setDeck] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${baseURL}/decks/${id}`
        })

        setDeck(response.data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])
  return [deck, error, isLoading]
}

const useCreateDeck = () => {
  const [boosters, sendBoosters] = useState(null)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (boosters) {
        setIsLoading(true)
        try {
          const response = await axios({
            method: 'post',
            url: `${baseURL}/decks/create`,
            data: boosters,
            headers: {
              Authorization: `Bearer ${authService.getAuthToken()}`
            }
          })
          setResponse(response.data)
          setIsLoading(false)
        } catch (error) {
          setError(error)
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [boosters])
  return [sendBoosters, response, error, isLoading]
}

const useEditDeck = () => {
  const [deck, editDeck] = useState(null)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (deck) {
        setIsLoading(true)
        try {
          const response = await axios({
            method: 'put',
            url: `${baseURL}/decks/${deck.api_id}`,
            data: deck,
            headers: {
              Authorization: `Bearer ${authService.getAuthToken()}`
            }
          })

          setResponse(response.data)
          setIsLoading(false)
        } catch (error) {
          setError(error)

          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [deck])
  return [editDeck, response, error, isLoading]
}

const useGetUserDecks = () => {
  const [decks, setDecks] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${baseURL}/user/decks`,
          headers: {
            Authorization: `Bearer ${authService.getAuthToken()}`
          }
        })

        setDecks(response.data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return [decks, error, isLoading]
}

const useGetUserDeck = (deckID) => {
  const [deck, setDeck] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${baseURL}/user/decks/${deckID}`,
          headers: {
            Authorization: `Bearer ${authService.getAuthToken()}`
          }
        })

        setDeck(response.data)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [deckID])
  return [deck, error, isLoading]
}

export default {
  get,
  getBySet,
  getAll,
  useGetDeck,
  create,
  useEditDeck,
  useCreateDeck,
  useGetUserDecks,
  useGetUserDeck
}
