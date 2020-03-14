import React, { useState } from 'react'
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar,
  Box,
  IconButton,
  Grid
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import styles from './styles'
import authService from '../../services/auth'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

export default function LoginView() {
  const classes = styles()
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const [user, error, isLoading] = authService.useGetUser()
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    let resp = await authService.login(values.email, values.password)

    if (resp.status === 'Fail') setErrorMessage(resp.message)
    else {
      history.replace(from)
      window.location.reload()
    }
  }

  function handleOnChange(e) {
    e.preventDefault()
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  return (
    <Grid container justify='center'>
      {user && <Redirect to='/' />}
      <Paper className={classes.loginPaper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        {errorMessage && (
          <Box
            p={1}
            mt={1}
            borderRadius={16}
            bgcolor='error.main'
            display='flex'
            alignItems='center'
          >
            <Typography className={classes.errorText}>{errorMessage}</Typography>
            <IconButton size='small' onClick={(e) => setErrorMessage('')}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        )}

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
  )
}
