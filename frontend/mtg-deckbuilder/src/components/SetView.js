import React, { useState, useEffect } from "react"
import setService from "../services/sets"
import CardImageGrid from "./CardImageGrid"

export default function SetView({ match }) {
  const [set, setSet] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchSetCards = async () => {
      let response = await setService.getCards(match.params.code)
      setCards(response.data)
    }

    const fetchSet = async () => {
      console.log("Dm2")
      let response = await setService.get(match.params.code)
      setSet(response.data)
    }

    fetchSetCards()
    fetchSet()
  })

  return <CardImageGrid cards={cards} />
}
