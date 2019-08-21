import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  signupPaper: {
    marginTop: 24,
    padding: 16,
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  signupForm: {
    width: "100%",
    marginTop: 8,
    padding: 16
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 10
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: "red"
  }
})

export default styles
