import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import SetRow from './SetRow'
import HeaderRow from './HeaderRow'

const styles = makeStyles({
  root: { maxWidth: 1200 },
  table: { width: 'fit-content' }
})

function SetsTable({ sets }) {
  const classes = styles()

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} size='small'>
        <HeaderRow />
        <TableBody>
          {sets.map((set) => (
            <SetRow set={set} key={set.id} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default React.memo(SetsTable)
