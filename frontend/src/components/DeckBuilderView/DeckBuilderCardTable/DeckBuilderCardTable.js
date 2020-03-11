import React, { useState, useMemo, useEffect, useCallback } from 'react'
import styles from './styles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import CRow from './CRow'
import Header from './Header'
import { sorted } from '../../Common/utils'

const DeckBuilderCardTable = React.memo(({ cards, handleTransfer, setImage, transferTrigger }) => {
  const classes = styles()
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('none')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    console.log('setImage')
  }, [setImage])

  useEffect(() => {
    console.log('trig')
    handleTransfer(cards.filter((c) => selected.indexOf(c.id) !== -1))
  }, [transferTrigger])

  var sortedCards = useMemo(() => {
    return sorted(cards, order, orderBy)
  }, [cards, order, orderBy])

  function handleSort(e, property) {
    setOrder(orderBy === property && order === 'desc' ? 'asc' : 'desc')
    setOrderBy(property)
  }

  function transferSelected() {
    handleTransfer(cards.filter((c) => selected.indexOf(c.id) !== -1))
  }

  const handleMouseOver = useCallback(
    (e) => {
      e.preventDefault()

      let cardID = e.target.id
      if (!cardID) return

      setImage(cards.find((card) => card.id === cardID))

      if (e.buttons === 1 && !selected.indexOf(cardID) !== -1) {
        setSelected([...selected, cardID])
      }

      if (e.ctrlKey && e.buttons === 1 && !selected.indexOf(cardID) !== -1) {
        setSelected([...selected, cardID])
      }
    },
    [cards, selected]
  )

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault()

      let cardID = e.target.id

      if (!cardID) return

      if (e.ctrlKey) {
        if (!selected.indexOf(cardID) !== -1) setSelected([...selected, cardID])
        else setSelected(selected.filter((id) => id !== cardID))
      } else setSelected([cardID])
    },
    [selected]
  )

  const handleDoubleClick = useCallback(
    (e) => {
      e.preventDefault()

      let cardID = e.target.id
      handleTransfer([cards.find((card) => card.id === cardID)])
    },
    [handleTransfer, cards]
  )

  function handleKeyPress(e) {
    e.preventDefault()

    if (e.key === 'ArrowDown') {
      if (selected.length === 0) setSelected(cards[0].id)
      else {
        const ids = sortedCards.map((c) => c.id)
        const cur = ids.indexOf(selected[selected.length - 1])
        const next = cur === sortedCards.length - 1 ? cur : cur + 1

        setSelected([ids[next]])
        setImage(sortedCards[next])
      }
    } else if (e.key === 'ArrowUp') {
      if (selected.length === 0) setSelected(cards[0].id)
      else {
        const ids = sortedCards.map((c) => c.id)
        const cur = ids.indexOf(selected[selected.length - 1])
        const next = cur === 0 ? cur : cur - 1

        setSelected([ids[next]])
        setImage(sortedCards[next])
      }
    } else if (e.key === 'Enter') {
      transferSelected()
    }
  }

  return (
    <Paper className={classes.paper}>
      <Table
        tabIndex='1'
        className={classes.table}
        size='small'
        selectable='false'
        onKeyDown={handleKeyPress}
        onMouseOver={(e) => handleMouseOver(e)}
        onDoubleClick={(e) => handleDoubleClick(e)}
        onClick={(e) => handleMouseDown(e)}
      >
        <Header order={order ? order : 'none'} orderBy={orderBy} onSort={handleSort} />
        <TableBody>
          {sortedCards.map((card) => (
            <CRow
              id={card.id}
              key={card.id}
              card={card}
              isSelected={selected.indexOf(card.id) !== -1}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
})

export default DeckBuilderCardTable
