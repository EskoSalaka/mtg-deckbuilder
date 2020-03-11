import React, { useState } from 'react'
import authService from '../../services/auth'
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link,
  Avatar,
  Box,
  IconButton
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import styles from './styles'
import history from '../../history'

export default function LoginView({ match }) {
  const classes = styles()

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    let resp = await authService.signup(values.username, values.email, values.password)

    if (resp.status === 'Fail') setErrorMessage(resp.message)
    else {
      history.push('/login')
    }
  }

  function handleOnChange(e) {
    e.preventDefault()
    setValues({ ...values, [e.target.id]: e.target.value })
    console.log(values)
  }

  return (
    <Paper className={classes.signupPaper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      {errorMessage && (
        <Box p={1} mt={1} borderRadius={16} bgcolor='error.main' display='flex' alignItems='center'>
          <Typography className={classes.errorText}>{errorMessage}</Typography>
          <IconButton size='small' onClick={(e) => setErrorMessage('')}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      )}
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
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submitButton}
        >
          Sign Up
        </Button>
        <Grid container justify='flex-end'>
          <Grid item>
            <Link href='#' variant='body2'>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
