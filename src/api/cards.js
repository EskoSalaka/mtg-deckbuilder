import { useApi } from './apiClient'

export default {
  useGetAll() {
    return useApi(`/cards/`)
  },

  useGet(id) {
    return useApi(`cards/${id}/`)
  },
  useGetBySet(code, collector_number) {
    return useApi(`/cards/${code}/${collector_number}/`)
  },
}
