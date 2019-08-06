import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  paper: { maxWidth: 460, maxHeight: "800px", overflowY: "auto" },
  table: {
    width: "100%",
    maxHeight: "800px"
  },

  headerCell: {
    fontSize: 16,
    /* backgroundColor: "black",
    color: "white", */

    top: 0,
    size: "small",
    padding: "3px 0px 3px 2px",
    paddingRight: "0px",
    zIndex: 100000000000
  },
  firstHeaderCell: {
    fontSize: 16,
    /* backgroundColor: "black",
    color: "white", */

    top: 0,
    size: "small",
    padding: "5px 8px 3px 12px",
    zIndex: 100000000000
  },
  lastHeaderCell: {
    fontSize: 16,
    /* backgroundColor: "black",
    color: "white", */

    top: 0,
    size: "small",
    padding: "3px 0px 3px 12px",
    paddingRight: "0px",
    zIndex: 10000000000000
  },
  cell: {
    padding: "3px 6px 3px 2px",
    paddingRight: "0px",
    whiteSpace: "pre",
    textDecoration: "none",
    borderBottom: "1px solid #bfbfbf"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e8e8e8;"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "transparent"
    }
  },
  cellText: {
    fontSize: 14,
    whiteSpace: "pre",
    userSelect: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "200px",
    lineHeight: 1.7,
    pointerEvents: "none",
    texDecoration: "none"
  },
  ptCell: { padding: "0px 0px 0px 2px", textDecoration: "none", borderBottom: "1px solid #bfbfbf" },
  ptCellText: {
    fontSize: 17,
    whiteSpace: "nowrap",
    userSelect: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "200px",
    lineHeight: 1.7,
    pointerEvents: "none",
    texDecoration: "none"
  },
  lastCell: {
    padding: "0px 0px 0px 12px",
    textDecoration: "none",
    borderBottom: "1px solid #bfbfbf"
  }
})

export default styles
