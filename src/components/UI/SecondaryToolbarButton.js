import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    minWidth: 80,
    margin: 8,
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'white',
      textDecoration: 'underline',
    },
  },
}))

const SecondaryToolbarButton = (props) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} disableRipple disableFocusRipple variant='text' {...props}>
      {props.children}
    </Button>
  )
}

export default SecondaryToolbarButton
