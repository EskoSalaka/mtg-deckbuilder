import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ManaCost from '../ManaCost'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import history from '../../history'

const styles = makeStyles({
  cellText: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    color: 'black',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '300px',
    texDecoration: 'none'
  },
  commonCellText: {
    fontSize: 14,
    color: 'black',
    userSelect: 'none',
    textDecoration: 'none'
  },
  uncommonCellText: {
    fontSize: 14,
    color: '#B5B3B3',
    userSelect: 'none',
    textDecoration: 'none'
  },
  rareCellText: {
    fontSize: 14,
    color: '#ECC700',
    userSelect: 'none',
    textDecoration: 'none'
  },
  mythicCellText: {
    fontSize: 14,
    userSelect: 'none',
    color: '#ed3700',
    textDecoration: 'none'
  },

  ptCellText: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    textOverflow: 'ellipsis',
    fontStyle: 'bold',
    textDecoration: 'none'
  },
  cell: {
    cursor: 'pointer',
    padding: '3px 6px 3px 11px',
    textDecoration: 'none',
    borderBottom: '1px solid #bfbfbf'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e8e8e8;'
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'transparent'
    }
  }
})

function CardRow({ card, handleMouseMove, handleMouseLeave }) {
  const classes = styles()

  const frontFace =
    card.layout === 'transform' || card.layout === 'double_faced_token'
      ? card.card_faces[0].image_uris.normal
      : card.image_uris.normal

  const manaCost =
    card.layout === 'transform' || card.layout === 'double_faced_token'
      ? card.card_faces[0].mana_cost
      : card.mana_cost

  const pt =
    card.layout === 'transform' || card.layout === 'double_faced_token'
      ? card.card_faces[0].power && card.card_faces[0].power + '/' + card.card_faces[0].toughness
      : card.power && card.power + '/' + card.toughness

  const R = card.rarity.charAt(0).toUpperCase()

  return (
    <TableRow
      hover
      className={classes.row}
      onMouseMove={(e) => handleMouseMove(e, frontFace)}
      onMouseOut={handleMouseLeave}
      onClick={() => {
        history.push(`/cards/${card.set}/${card.collector_number}`)
        history.go()
      }}
    >
      <TableCell key='set' className={classes.cell}>
        <Typography className={classes.cellText}>{card.set.toUpperCase()}</Typography>
      </TableCell>
      <TableCell key='name' className={classes.cell}>
        <Typography className={classes.cellText}>{card.name}</Typography>
      </TableCell>
      <TableCell key='type' className={classes.cell}>
        <Typography className={classes.cellText}>
          {card.type_line.replace('Legendary', 'Lgd.')}
        </Typography>
      </TableCell>
      <TableCell key='p/t' className={classes.cell}>
        <Typography className={classes.ptCellText}>{pt}</Typography>
      </TableCell>
      <TableCell key='manacost' className={classes.cell}>
        <ManaCost manaCost={manaCost} />
      </TableCell>
      <TableCell key='R' className={classes.cell}>
        <Typography
          className={
            R === 'M'
              ? classes.mythicCellText
              : R === 'R'
              ? classes.rareCellText
              : R === 'U'
              ? classes.uncommonCellText
              : classes.commonCellText
          }
        >
          {card.rarity.charAt(0).toUpperCase()}
        </Typography>
      </TableCell>
      <TableCell key='no' className={classes.cell}>
        <Typography className={classes.cellText}>{card.collector_number}</Typography>
      </TableCell>
    </TableRow>
  )
}

export default React.memo(CardRow)
