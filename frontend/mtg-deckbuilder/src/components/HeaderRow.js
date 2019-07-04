import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const HeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    fontSize: 12,
    size: 'small'
  }
}))(TableCell)

export default function HeaderRow() {
  return (
    <TableRow>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>Type</HeaderCell>
      <HeaderCell>P/T</HeaderCell>
      <HeaderCell>Cost</HeaderCell>
    </TableRow>
  )
}
