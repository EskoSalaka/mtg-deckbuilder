import React from 'react'
import styles from './styles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { TableHead, TableSortLabel } from '@material-ui/core'

export default function Header({ order, orderBy, onSort }) {
  const classes = styles()

  const createSortHandler = (property) => (e) => {
    onSort(e, property)
  }

  const headerRows = [
    { id: 'name', numeric: false, label: 'Card' },
    { id: 'type', numeric: false, label: 'Type' },
    { id: 'cost', numeric: false, label: 'Cost' }
  ]

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.firstHeaderCell} key={'num'} align='left'>
          {' '}
        </TableCell>
        {headerRows.map((row) => (
          <TableCell
            className={classes.headerCell}
            key={row.id}
            align='left'
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          className={classes.lastHeaderCell}
          key={'pt'}
          align='left'
          sortDirection={orderBy === 'pt' ? order : false}
        >
          {'PT'}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
