import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  paper: {
    maxWidth: 420,
    minWidth: 420,
    maxHeight: 600,

    overflowY: "auto",
    overflowX: "hidden"
  },
  table: {
    width: "100%",
    maxWidth: 420,
    maxHeight: 600,

    padding: "10px"
  },

  headerCell: {
    fontSize: 16,

    background: "#bdbdbd",

    top: 0,
    size: "small",
    padding: "3px 0px 3px 4px",
    paddingRight: "0px",
    zIndex: 100000000000
  },
  firstHeaderCell: {
    fontSize: 16,
    background: "#bdbdbd",

    top: 0,
    size: "small",
    padding: "5px 8px 3px 12px",
    zIndex: 100000000000
  },
  lastHeaderCell: {
    fontSize: 16,
    background: "#bdbdbd",

    top: 0,
    size: "small",
    padding: "3px 0px 3px 12px",
    paddingRight: "0px",
    zIndex: 10000000000000
  },
  cell: {
    padding: "3px 6px 3px 4px",
    paddingRight: "0px",
    whiteSpace: "pre",
    textDecoration: "none",
    borderBottom: "1px solid #bfbfbf"
  },
  row: {
    ":&selected": {
      color: "black"
    }
  },
  rowSelected: {},
  cellText: {
    fontSize: 14,
    whiteSpace: "pre",
    userSelect: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "180px",
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
    maxWidth: "150px",
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
