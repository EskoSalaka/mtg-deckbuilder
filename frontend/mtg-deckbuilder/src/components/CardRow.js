import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    userSelect: 'none'
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

class CardRow extends React.Component {
  render() {
    return (
      <StyledTableRow
        value={this.props.card}
        hover
        onClick={e => this.props.handleClick(e, this.props.card)}
        onMouseEnter={e => this.props.handleMouseEnter(e, this.props.card)}
        onMouseLeave={e => this.props.handleMouseLeave(e, this.props.card)}
        key={this.props.card.api_id}>
        <StyledTableCell align="left">{this.props.card.name}</StyledTableCell>
        <StyledTableCell align="left">
          {this.props.card.type_line}
        </StyledTableCell>
        <StyledTableCell align="left">
          {this.props.card.power}
          {'/'}
          {this.props.card.toughness}
        </StyledTableCell>
        <StyledTableCell align="left">
          {this.props.card.mana_cost}
        </StyledTableCell>
      </StyledTableRow>
    )
  }
}

export default CardRow
