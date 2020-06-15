import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import DeckRow from './DeckRow'
import HeaderRow from './HeaderRow'

const styles = makeStyles({
  root: { maxWidth: 1200 },
  table: { width: 'fit-content' },
})

function UserDecksTable({ decksInfo, handleDelete, isLoading }) {
  const classes = styles()

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} size='small'>
        <HeaderRow />
        <TableBody>
          {decksInfo.map((deckInfo) => (
            <DeckRow
              deckInfo={deckInfo}
              key={deckInfo.api_id}
              handleDelete={handleDelete}
              isLoading={isLoading}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default React.memo(UserDecksTable)
