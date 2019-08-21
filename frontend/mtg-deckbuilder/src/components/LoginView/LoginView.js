import React, { useState, useEffect } from "react"
import setService from "../../services/sets"
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Avatar,
  Box,
  IconButton
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
import styles from "./styles"
import authService from "../../services/auth"

export default function LoginView({ match }) {
  const classes = styles()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(email, password)
    let resp = await authService.login(email, password)
    console.log("====================================")
    console.log(resp)
    console.log("====================================")

    if (resp.status === "Fail") setErrorMessage(resp.message)

    let resp2 = await authService.verify_auth()
    console.log("====================================")
    console.log(resp2)
    console.log("====================================")
  }

  function handleOnChange(e) {
    e.preventDefault()
    e.target.id === "email" ? setEmail(e.target.value) : setPassword(e.target.value)

    console.log(email, password)
  }

  useEffect(() => {}, [])

  return (
    <Paper className={classes.loginPaper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      {errorMessage ? (
        <Box p={1} borderRadius={16} bgcolor="error.main" display="flex" alignItems="center">
          <Typography className={classes.errorText}>{errorMessage}</Typography>
          <IconButton size="small" onClick={e => setErrorMessage("")}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      ) : null}

      <form className={classes.loginForm} noValidate onSubmit={handleSubmit}>
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
          onChange={handleOnChange}
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
          onChange={handleOnChange}
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
