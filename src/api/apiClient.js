import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

const baseURL = '/api'

export const apiClient = axios.create({
  baseURL: baseURL,
})

axios.defaults.withCredentials = true

export const useApi = makeUseAxios({
  axios: apiClient,
})
