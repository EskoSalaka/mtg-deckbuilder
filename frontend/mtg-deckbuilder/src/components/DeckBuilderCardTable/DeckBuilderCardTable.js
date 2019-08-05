import React, { useState } from "react"
import styles from "./styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CRow from "./CRow"
import Header from "./Header"

export default function DeckBuilderCardTable({ cards }) {
  const classes = styles()
  console.log("====================================")
  console.log()
  console.log("====================================")

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small">
        <Header />
        <TableBody>
          {cards.map(card => (
            <CRow key={card.api_key} card={card} num={1} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
