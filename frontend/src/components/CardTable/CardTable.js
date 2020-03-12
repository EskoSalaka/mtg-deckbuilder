import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import CardRow from './CardRow'
import CardImagePopover from './CardImagePopover'
import HeaderRow from './HeaderRow'

const styles = makeStyles({
  root: { maxWidth: 1200 },
  table: { width: 'fit-content' }
})

function CardTable({ cards }) {
  const classes = styles()

  const [cardImageToPopover, setCardImageToPopover] = useState('')
  const [cardImagePopoverPosition, setCardImagePopoverPosition] = useState({
    top: '200px',
    left: '200px'
  })

  const handleMouseMove = useCallback((e, card) => {
    setCardImageToPopover(card)
    setCardImagePopoverPosition({ top: e.pageY - 50 + 'px', left: e.pageX + 50 + 'px' })
  }, [])

  const handleMouseLeave = useCallback((e) => {
    setCardImageToPopover(null)
  }, [])

  return (
    <Paper className={classes.root}>
      {cardImageToPopover && (
        <CardImagePopover cardImg={cardImageToPopover} anchorPosition={cardImagePopoverPosition} />
      )}
      <Table className={classes.table} size='small'>
        <HeaderRow />
        <TableBody>
          {cards.map((card) => (
            <CardRow
              card={card}
              handleMouseMove={handleMouseMove}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default React.memo(CardTable)
