import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
    backgroundColor: '#13293d'
  },
  title: { paddingRight: 30 },
  strecter: { flex: 1 },
  toolbar: {},
  button: { color: 'white' },
  link: { textDecoration: 'none', color: 'white' }
}))

function MTGAppBar() {
  const classes = useStyles()
  let history = useHistory()

  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <div>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <Link to='/' className={classes.link}>
            <Typography variant='h6' className={classes.title}>
              MTG Deckbuilder
            </Typography>
          </Link>

          <Button component={Link} to='/sets' color='primary' className={classes.button}>
            Sets
          </Button>
          <Typography variant='h6' className={classes.strecter}></Typography>
          {!user ? (
            <>
              <Button component={Link} to='/login' color='primary' className={classes.button}>
                Log in
              </Button>{' '}
              <Button component={Link} to='/signup' color='primary' className={classes.button}>
                Sign up
              </Button>{' '}
            </>
          ) : (
            <>
              <Button component={Link} to='/decks/new' color='primary' className={classes.button}>
                Create a new deck
              </Button>{' '}
              <Button component={Link} to='/user/decks' color='primary' className={classes.button}>
                My decks
              </Button>{' '}
              <Button color='primary' className={classes.button} onClick={handleLogout}>
                Log out
              </Button>{' '}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default React.memo(MTGAppBar)
