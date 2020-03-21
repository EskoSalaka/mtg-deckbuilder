import React from "react"

import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { TableHead, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const styles = makeStyles({
  headCell: {
    backgroundColor: "black",
    color: "white",
    top: 0,
    size: "small",
    padding: "5px 6px 5px 11px"
  },
  headText: {
    fontSize: 16
  }
})

export default function HeaderRow() {
  const classes = styles()

  return (
    <TableHead>
      <TableRow key={"head"}>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>Set</Typography>
        </TableCell>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>Name</Typography>
        </TableCell>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>Type</Typography>
        </TableCell>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>P/T</Typography>
        </TableCell>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>Cost</Typography>
        </TableCell>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>R</Typography>
        </TableCell>
        <TableCell className={classes.headCell}>
          <Typography className={classes.headText}>No</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
