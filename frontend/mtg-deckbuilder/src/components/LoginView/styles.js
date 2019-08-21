import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  loginPaper: {
    marginTop: 24,
    padding: 24,
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  loginForm: {
    width: "100%",
    marginTop: 8
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: "red"
  },
  errorText: { paddingLeft: 6, paddingRight: 6 }
})

export default styles
