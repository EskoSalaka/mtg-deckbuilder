import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import CardRow from './CardRow'

import HeaderRow from './HeaderRow'

const styles = makeStyles({
  root: { maxWidth: 1200 },
  table: { width: 'fit-content' }
})

function CardTable({ cards, handleMouseMove, handleMouseLeave }) {
  const classes = styles()

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} size='small'>
          <HeaderRow />
          <TableBody>
            {cards.map((card) => (
              <CardRow
                key={card.id}
                card={card}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default React.memo(CardTable)
