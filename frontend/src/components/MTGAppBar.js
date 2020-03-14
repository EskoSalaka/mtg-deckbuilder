import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import authService from '../services/auth'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom'
import Loading from './Common/Loading'

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
  let location = useLocation()

  const [user, error, isLoading] = authService.useGetUser()

  async function handleLogout(e) {
    const resp = await authService.logout()

    if (resp.status === 'Success') {
      history.push('/')
      window.location.reload()
    } else {
      history.push('/')
      window.location.reload()
    }
  }

  if (isLoading) return <Loading />

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
