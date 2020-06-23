import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../api/auth'
import MtgDeckbuilderGradientIcon from './Common/MtgDeckbuilderGradientIcon'
import { Box } from '@material-ui/core'
import PrimaryButton from './UI/PrimaryButton'
import PrimaryActionButton from './UI/PrimaryActionButton'
import AddIcon from '@material-ui/icons/Add'
import SecondaryToolbarButton from './UI/SecondaryToolbarButton'

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
    backgroundColor: '#37474f',
  },
  title: { paddingRight: 30 },
  strecter: { flex: 1 },
  toolbar: {},
  buttonPrimary: {
    color: 'white',
    border: '1px solid',
    borderRadius: '40px',
    minWidth: 80,
    margin: 8,
  },
  link: { textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' },
}))

function MTGAppBar() {
  const history = useHistory()
  const classes = useStyles()

  const {
    user,
    useLogout: [, logout],
  } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.reload()
    history.push('/')
  }

  return (
    <div>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <Link to='/' className={classes.link}>
            <Box mr={1}>
              <MtgDeckbuilderGradientIcon />
            </Box>
            <Typography variant='h6' className={classes.title}>
              MTG Deckbuilder
            </Typography>
          </Link>

          <SecondaryToolbarButton component={Link} to='/sets'>
            Sets
          </SecondaryToolbarButton>

          {!user ? (
            <>
              <Typography variant='h6' className={classes.strecter}></Typography>
              <PrimaryButton component={Link} to='/login'>
                Log in
              </PrimaryButton>{' '}
              <PrimaryButton component={Link} to='/signup'>
                Sign up
              </PrimaryButton>{' '}
            </>
          ) : (
            <>
              <SecondaryToolbarButton component={Link} to='/user/decks'>
                My decks
              </SecondaryToolbarButton>
              <SecondaryToolbarButton component={Link} to=''>
                My cubes
              </SecondaryToolbarButton>
              <Typography variant='h6' className={classes.strecter}></Typography>
              <PrimaryActionButton component={Link} to='/decks/new' startIcon={<AddIcon />}>
                New deck
              </PrimaryActionButton>
              <PrimaryButton onClick={handleLogout}>Log out</PrimaryButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default React.memo(MTGAppBar)
