import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  buttonPrimary: {
    color: 'white',
    backgroundColor: theme.palette.primaryToolbalButton,
    border: '1px solid',
    borderRadius: '40px',
    minWidth: 80,
    margin: 8,
    '&:hover': {
      backgroundColor: theme.palette.primaryToolbalButtonHover,
      color: 'white',
    },
  },
}))

const PrimaryButton = (props) => {
  const classes = useStyles()

  return (
    <Button variant='outlined' className={classes.buttonPrimary} {...props}>
      {props.children}
    </Button>
  )
}

export default PrimaryButton
