import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import DeckRow from './DeckRow'
import HeaderRow from './HeaderRow'

const styles = makeStyles({
  table: { width: 550 },
})

function UserDecksTable({ decks }) {
  const classes = styles()

  return (
    <Table className={classes.table} size='small'>
      <HeaderRow />
      <TableBody>
        {decks && decks.map((deckInfo) => <DeckRow deckInfo={deckInfo} key={deckInfo.api_id} />)}
      </TableBody>
    </Table>
  )
}

export default React.memo(UserDecksTable)
