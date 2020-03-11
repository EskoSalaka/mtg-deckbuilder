import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = makeStyles({
  loader: { position: 'fixed', top: '50%', left: '50%' }
})

export default function Loading() {
  const classes = styles()
  return <CircularProgress className={classes.loader} />
}
