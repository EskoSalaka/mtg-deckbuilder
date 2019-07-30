import React, { useState, useEffect } from "react"
import setService from "../../services/sets"
import CardImageGrid from "../CardImageGrid/CardImageGrid"

export default function SetView({ match }) {
  const [set, setSet] = useState({})
  const [cards, setCards] = useState([])

  const fetchSetCards = async () => {
    let response = await setService.getCards(match.params.code)

    setCards(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)))
  }

  const fetchSet = async () => {
    let response = await setService.get(match.params.code)
    setSet(response.data)
  }

  useEffect(() => {
    fetchSetCards()
    fetchSet()
  }, [])

  return <CardImageGrid cards={cards} />
}
