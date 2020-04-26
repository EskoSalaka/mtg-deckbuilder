import React, { useState, useEffect } from 'react'
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar,
  Container,
  Box,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import styles from './styles'

import { Redirect, useHistory, useLocation } from 'react-router-dom'
import AlertSnackbar from '../Common/AlertSnackbar'
import { useAuth } from '../../api/auth'
import LoadingWrapper from '../Common/LoadingWrapper'

export default function LoginView() {
  const classes = styles()
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const {
    user,
    useLogin: [{ loading, error }, login],
  } = useAuth()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ data: new URLSearchParams(values) })
  }

  const handleOnChange = (e) => {
    e.preventDefault()
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') return

    setAlertOpen(false)
  }

  useEffect(() => {
    if (error) {
      setAlertMessage(error.response.data.message)
      setAlertOpen(true)
    }
  }, [error])

  if (user) return <Redirect to={history.replace(from.pathname)} />

  return (
    <Container main maxWidth='lg'>
      <Box display='flex' justifyContent='center'>
        <AlertSnackbar open={alertOpen} message={alertMessage} handleClose={handleCloseAlert} />
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
            <LoadingWrapper loading={loading}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disableElevation
              >
                Sign In
              </Button>
            </LoadingWrapper>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}
