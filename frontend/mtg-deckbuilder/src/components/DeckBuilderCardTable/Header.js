import React from "react"
import styles from "./styles"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { TableHead, TableSortLabel } from "@material-ui/core"

export default function Header({ order, orderBy, onRequestSort }) {
  const classes = styles()

  const headerRows = [
    { id: "card", numeric: false, label: "Card" },
    { id: "type", numeric: false, label: "Type" },

    { id: "cost", numeric: false, label: "Cost" }
  ]

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.firstHeaderCell} key={"num"} align="left">
          {" "}
        </TableCell>
        {headerRows.map(row => (
          <TableCell className={classes.headerCell} key={row.id} align="left">
            <TableSortLabel active={false} direction={"asc"}>
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={classes.lastHeaderCell} key={"pt"} align="left">
          <TableSortLabel active={false} direction={"asc"}>
            {"PT"}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
