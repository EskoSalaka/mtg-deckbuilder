import React, { useState, useEffect } from 'react'
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Container,
  Box,
} from '@material-ui/core'

import styles from './styles'

import { Redirect, useLocation } from 'react-router-dom'
import AlertSnackbar from '../Common/AlertSnackbar'
import { useAuth } from '../../api/auth'
import LoadingWrapper from '../Common/LoadingWrapper'
import MtgDeckbuilderGradientIcon from '../Common/MtgDeckbuilderGradientIcon'
import PrimaryActionButton from '../UI/PrimaryActionButton'

export default function LoginView() {
  const classes = styles()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const {
    user,
    useLogin: [{ response, loading, error }, login],
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

  if (user) return <Redirect to={from.pathname} />

  return (
    <Container maxWidth='lg'>
      <Box display='flex' justifyContent='center'>
        <AlertSnackbar open={alertOpen} message={alertMessage} handleClose={handleCloseAlert} />
        <Paper className={classes.loginPaper}>
          <MtgDeckbuilderGradientIcon />
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
            <LoadingWrapper loading={loading} success={response?.status === 200}>
              <PrimaryActionButton
                type='submit'
                fullWidth
                className={classes.submit}
                disableElevation
              >
                Sign In
              </PrimaryActionButton>
            </LoadingWrapper>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}
