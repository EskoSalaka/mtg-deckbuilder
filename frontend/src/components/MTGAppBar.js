import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0
  },
  toolbar: { backgroundColor: '#13293d' },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}))

export default function MTGAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.toolbar}>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>MTG Deckbuilder</Typography>
          <Button color='inherit'>LOGIN / SIGN UP</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
