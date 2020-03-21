import React from 'react'
import styles from './styles'
import Type from '../../Common/Type'
import ManaCost from '../../ManaCost'
import { frontFaceAttr } from '../../Common/utils'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Typography } from '@material-ui/core'

function CRow({ card, isSelected }) {
  const classes = styles()

  return (
    <TableRow className={classes.row} hover selected={isSelected}>
      <TableCell key='num' className={classes.cell} id={card.id}>
        <Typography className={classes.cellText}>{card.count}</Typography>
      </TableCell>
      <TableCell key='name' className={classes.cell} id={card.id}>
        <Typography className={classes.cellText}>{card.name}</Typography>
      </TableCell>
      <TableCell key='type' className={classes.ptCell} id={card.id}>
        <Typography className={classes.ptCellText}>
          <Type typeLine={card.type_line} />
        </Typography>
      </TableCell>
      <TableCell key='cost' className={classes.cell} id={card.id}>
        <Typography className={classes.cellText}>
          <ManaCost manaCost={frontFaceAttr(card, 'mana_cost')} />
        </Typography>
      </TableCell>
      <TableCell key='pt' className={classes.lastCell} id={card.id}>
        <Typography className={classes.ptCellText}>
          {frontFaceAttr(card, 'power')
            ? frontFaceAttr(card, 'power') + '/' + frontFaceAttr(card, 'toughness')
            : null}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default React.memo(CRow)
