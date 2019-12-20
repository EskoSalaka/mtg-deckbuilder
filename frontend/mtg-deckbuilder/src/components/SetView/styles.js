import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  grow: {
    flexGrow: 1
  },
  titleText: { fontSize: 16 },
  subtitleText: { fontSize: 14 },
  subToolbar: {
    paddingTop: 3,
    paddingBottom: 3
  },
  mainContainer: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 32
  },
  formControl: {
    minWidth: 120,
    maginLeft: 32,
    marginRight: 32
  }
})

export default styles
