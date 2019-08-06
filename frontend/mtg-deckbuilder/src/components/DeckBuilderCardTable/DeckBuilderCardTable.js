import React, { useState, useEffect } from "react"
import styles from "./styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CRow from "./CRow"
import Header from "./Header"
import sortedCards from "../Common/utils"

export default function DeckBuilderCardTable({ cards }) {
  const classes = styles()
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("name")
  const [cardsRef, setCardsRef] = useState(cards)

  function handleSort(e, property) {
    const isDesc = orderBy === property && order === "desc"
    setOrder(isDesc ? "asc" : "desc")
    setOrderBy(property)
  }

  useEffect(() => {
    console.log("====================================")
    console.log(cardsRef)
    console.log("====================================")
    const s = sortedCards(cardsRef, order, orderBy)
    console.log("====================================")
    console.log(s)
    console.log("====================================")
    setCardsRef(sortedCards(cardsRef, order, orderBy))
    console.log("====================================")
    console.log(cardsRef)
    console.log("====================================")
  }, [order, orderBy])

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small">
        <Header order={order} orderBy={orderBy} onSort={handleSort} />
        <TableBody>
          {cardsRef.map(card => (
            <CRow card={card} num={1} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
