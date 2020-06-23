import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  buttonPrimary: {
    color: 'white',
    border: '1px solid',
    borderRadius: '40px',
    minWidth: 80,
    margin: 8,
  },
}))

const PrimaryActionButton = (props) => {
  const classes = useStyles()

  return (
    <Button variant='contained' color='primary' className={classes.buttonPrimary} {...props}>
      {props.children}
    </Button>
  )
}

export default PrimaryActionButton
