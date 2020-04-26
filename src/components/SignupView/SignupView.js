import React, { useState, useEffect } from 'react'
import { useAuth } from '../../api/auth'
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link,
  Avatar,
  Container,
  Box,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AlertSnackbar from '../Common/AlertSnackbar'
import LoadingWrapper from '../Common/LoadingWrapper'

import { makeStyles } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

const styles = makeStyles({
  signupPaper: {
    marginTop: 24,
    padding: 16,
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signupForm: {
    width: '100%',
    marginTop: 8,
    padding: 16,
  },
  submitButton: {
    borderRadius: 26,
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: 'red',
  },
  errorText: { paddingLeft: 6, paddingRight: 6 },
})

export default function LoginView() {
  const classes = styles()
  const {
    useSignup: [{ response, loading, error }, signup],
  } = useAuth()

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    signup({ data: new URLSearchParams(values) })
  }

  function handleOnChange(e) {
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

  if (response?.status === 200) return <Redirect to={'/login'} />

  return (
    <Container maxWidth='lg'>
      <Box display='flex' justifyContent='center'>
        <AlertSnackbar open={alertOpen} message={alertMessage} handleClose={handleCloseAlert} />
        <Paper className={classes.signupPaper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form
            className={classes.signupForm}
            noValidate
            onSubmit={handleSubmit}
            onChange={handleOnChange}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='uname'
                  name='username'
                  variant='outlined'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <Box mb={2} mt={3}>
              <LoadingWrapper loading={loading}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submitButton}
                  disableElevation
                >
                  Sign Up
                </Button>
              </LoadingWrapper>
            </Box>

            <Box display='flex' justifyContent='flex-end'>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}
