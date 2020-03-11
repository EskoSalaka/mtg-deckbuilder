import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  paper: {
    width: "fit-content",
    padding: 10
  },
  posBox: { alignSelf: "center" },
  boosterTextField: {
    width: 90
  },
  popoverBottomGrid: { paddingBottom: 0 },
  cell: {
    paddingTop: 3,
    paddingBottom: 3,
    whiteSpace: "pre",
    textDecoration: "none"
  },
  lastCell: {
    padding: "3px 6px 3px 4px",
    paddingRight: "0px",
    whiteSpace: "pre",
    textDecoration: "none",
    borderBottom: "0px"
  },
  cellText: {
    fontSize: 14,
    whiteSpace: "pre"
  },
  subheaderSecondary: { fontSize: 12 },
  subheaderPrimary: { fontSize: 14, fontWeight: 500 },

  cellTextSecondary: {
    fontSize: 10,
    whiteSpace: "pre"
  },
  createSealedAppbar: { background: "tan" },
  tomeIcon: { width: "100%", height: "100%" },
  tomeIconButton: { width: 50, height: 50, marginLeft: "auto" }
})

export default styles
