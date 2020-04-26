import { useApi } from './apiClient'

export default {
  useGetAll() {
    return useApi(`/sets/`)
  },

  useGet(code) {
    return useApi(`sets/${code}/`)
  },

  useGetCards(code) {
    return useApi(`/sets/${code}/cards/`)
  },

  useGetStandardBooster(code) {
    return useApi(`/sets/${code}/booster/`)
  },
}
