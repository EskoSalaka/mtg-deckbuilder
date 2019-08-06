import React, { useState, useEffect } from "react"
import styles from "./styles"
import TableBody from "@material-ui/core/TableBody"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CRow from "./CRow"
import Header from "./Header"
import { cardSort, byCount, includesCard } from "../Common/utils"

export default function DeckBuilderCardTable({ cards }) {
  const classes = styles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("none")
  const [selected, setSelected] = useState([])
  const [cardsRef, setCardsRef] = useState(cards)

  function isSelected(card) {
    return selected.indexOf(card.id) !== -1
  }

  function decrCard(card) {
    let decremeneted = cardsRef.map(c => {
      if (c.id === card.id) c.count = c.count - 1
      return c
    })
    setCardsRef(
      decremeneted.filter(c => {
        return c.count !== 0 ? c : null
      })
    )
  }

  function incrCard(card) {
    includesCard(cardsRef, card)
      ? setCardsRef(
          cardsRef.map(c => {
            if (c.id === card.id) c.count = c.count + 1
            return c
          })
        )
      : setCardsRef([...cardsRef, card])
  }

  function handleSort(e, property) {
    setOrder(orderBy === property && order === "desc" ? "asc" : "desc")
    setOrderBy(property)
    setCardsRef(
      cardSort(cardsRef, orderBy === property && order === "desc" ? "asc" : "desc", property)
    )
  }

  function handleClick(e, card) {
    if (e.type === "click") {
      decrCard(card)
    } else if (e.type === "contextmenu") {
      incrCard(card)
    }
  }

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small">
        <Header order={order ? order : "none"} orderBy={orderBy} onSort={handleSort} />
        <TableBody>
          {cardsRef.map(card => (
            <CRow card={card} selected={isSelected(card)} handleClick={e => handleClick(e, card)} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
