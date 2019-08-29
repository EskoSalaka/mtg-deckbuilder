import React from "react"
import styles from "./styles"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { TableHead, TableSortLabel, Typography } from "@material-ui/core"

export default function SetsTableHeader() {
  const classes = styles()

  const headerRows = [
    { id: "name", numeric: false, label: "Set" },
    { id: "count", numeric: false, label: "Cards" },
    { id: "date", numeric: false, label: "Date" }
  ]

  return (
    <TableHead>
      <TableRow>
        {headerRows.map(row => (
          <TableCell key={row.id} align="left">
            <Typography>{row.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
