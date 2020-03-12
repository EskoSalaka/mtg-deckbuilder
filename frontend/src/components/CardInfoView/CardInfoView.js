import React, { useState, useEffect } from 'react'
import FullCardInfo from './FullCardInfo'
import Loading from '../Common/Loading'
import cardService from '../../services/cards'
import { useParams } from 'react-router-dom'

export default function CardInfoView() {
  const { code, collector_number } = useParams()

  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCard = async () => {
    let response = await cardService.getBySet(code, collector_number)

    setCard(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCard()
  }, [])

  return loading ? <Loading /> : <FullCardInfo card={card} />
}
