import React from 'react'
import FullCardInfo from './FullCardInfo'
import Loading from '../Common/Loading'
import cards from '../../api/cards'
import { useParams } from 'react-router-dom'

export default function CardInfoView() {
  const { code, collector_number } = useParams()

  const [{ data, error, loading }] = cards.useGetBySet(code, collector_number)
  console.log(data)

  if (error) throw error

  if (loading) return <Loading />

  return <FullCardInfo card={data} />
}
