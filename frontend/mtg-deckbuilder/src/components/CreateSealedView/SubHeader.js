import React from "react"
import styles from "./styles"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { Typography, Box } from "@material-ui/core"

export default function SectionHeader({ title, type }) {
  const classes = styles()

  return (
    <TableRow>
      <TableCell key={title} align="left">
        <Box pl={1} pt={2}>
          {type === "primary" ? (
            <Typography className={classes.subheaderPrimary}>{title}</Typography>
          ) : (
            <Typography className={classes.subheaderSecondary}>{title}</Typography>
          )}
        </Box>
      </TableCell>
      <TableCell key={"filler1"} align="left"></TableCell>
      <TableCell key={"filler2"} align="left"></TableCell>
    </TableRow>
  )
}
