import { useApi } from './apiClient'

export default {
  useGet(id) {
    return useApi(`/decks/${id}`)
  },

  useCreate(boosters) {
    return useApi(
      {
        url: '/decks/create',
        method: 'POST',
        data: boosters,
      },
      { manual: true }
    )
  },

  useEdit(deck) {
    return useApi(
      {
        url: `/decks/${deck.api_id}`,
        method: 'PUT',
        data: deck,
      },
      { manual: true }
    )
  },

  useGetUserDecks(page = 1) {
    return useApi(
      {
        url: '/user/decks',
        method: 'GET',
        params: { page: page },
      },
      { manual: true }
    )
  },

  useGetUserDeck(deckID) {
    return useApi(`/user/decks/${deckID}`)
  },

  useDelete(deckID) {
    return useApi(
      {
        url: `/decks/${deckID}`,
        method: 'DELETE',
      },
      { manual: true }
    )
  },
}
