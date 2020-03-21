import React, { useState } from 'react'
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar,
  Grid
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import styles from './styles'

import { Redirect, useHistory, useLocation } from 'react-router-dom'
import AlertSnackbar from '../Common/AlertSnackbar'
import { useAuth } from '../../AuthContext'
import Loading from '../Common/Loading'

export default function LoginView() {
  const classes = styles()
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const { user, login, isLoading } = useAuth()
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const loginResponse = await login(values.email, values.password)

    if (loginResponse.status === 'Fail') {
      setAlertMessage(loginResponse.message)
      setAlertSeverity('error')
      setAlertOpen(true)
    } else {
      history.replace(from.pathname)
    }
  }

  function handleOnChange(e) {
    e.preventDefault()
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  if (user) return <Redirect to='/' />

  return (
    <div>
      {isLoading && <Loading />}
      <AlertSnackbar
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleCloseAlert}
      />
      <Grid container justify='center'>
        <Paper className={classes.loginPaper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>

          <form
            className={classes.loginForm}
            noValidate
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}
