import React, { useState, useEffect } from "react"
import setService from "../../services/sets"
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import styles from "./styles"

export default function LoginView({ match }) {
  const classes = styles()
  console.log("====================================")
  console.log("Set")
  console.log(match)
  console.log("====================================")

  useEffect(() => {}, [])

  return (
    <Paper className={classes.loginPaper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.loginForm} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Paper>
  )
}
