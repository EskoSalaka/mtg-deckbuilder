import React from 'react'

import Loading from '../Common/Loading'
import cards from '../../api/cards'
import { useParams } from 'react-router-dom'

import { Grid, makeStyles } from '@material-ui/core'
import CardInfoBox from './CardInfoBox'
import CardImage from '../CardImage'

const styles = makeStyles({
  imageBox: { maxWidth: '400px', minWidth: '350px', padding: '10px' },
  infoBox: { maxWidth: '400px', minWidth: '350px', paddingTop: '20px', padding: '10px' },
})

export default function CardInfoView() {
  const classes = styles()
  const { code, collector_number } = useParams()

  const [{ data, error, loading }] = cards.useGetBySet(code, collector_number)
  console.log(data)

  if (error) throw error

  if (loading) return <Loading />

  return (
    data && (
      <Grid spacing={0} container justify='center'>
        <Grid item className={classes.infoBox}>
          <CardInfoBox card={data} />
        </Grid>
        <Grid item className={classes.imageBox}>
          <CardImage card={data} />
        </Grid>
      </Grid>
    )
  )
}
