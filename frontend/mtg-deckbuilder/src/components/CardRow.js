import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ManaCost from './ManaCost'
import { makeStyles } from '@material-ui/styles'

const styles = makeStyles({
  manaBody: {
    fontSize: 18,
    userSelect: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  body: {
    fontSize: 12,
    userSelect: 'none'
  },

  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#a8a5a8'
    }
  }
})

export default function CardRow(props) {
  const classes = styles()

  return (
    <TableRow
      className={classes.row}
      value={props.card}
      hover
      onClick={e => props.handleClick(e, props.card)}
      onMouseEnter={e => props.handleMouseEnter(e, props.card)}
      onMouseLeave={e => props.handleMouseLeave(e, props.card)}>
      <TableCell className={classes.body}>{props.card.name}</TableCell>
      <TableCell className={classes.body}>{props.card.type_line}</TableCell>
      <TableCell className={classes.body}>
        {props.card.power}
        {'/'}
        {props.card.toughness}
      </TableCell>
      <TableCell className={classes.manaBody}>
        <ManaCost manaCost={props.card.mana_cost} />
      </TableCell>
    </TableRow>
  )
}
