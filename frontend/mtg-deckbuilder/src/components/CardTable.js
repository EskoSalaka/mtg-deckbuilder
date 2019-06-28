import React from 'react'
import Table from '@material-ui/core/Table'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableCell from '@material-ui/core/TableCell'
import CardRow from './CardRow'
import CardImageBox from './CardImageBox'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,
    maxWidth: 800
  },
  topRow: {
    '&:hover': {
      backgroundColor: 'blue !important'
    }
  }
}))

class CardTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cardImageToShow: '',
      showCardIamge: false,
      anchorPosition: null,
      lineEL: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleClick = (e, card) => {
    e.preventDefault()
    // access to e.target here
    console.log('click', card.name)
    console.log(e.screenX, e.screenY)
  }

  handleMouseEnter = (e, card) => {
    e.preventDefault()
    console.log(e.currentTarget)

    const x = e.clientX
    const y = e.clientY

    const getBoundingClientRect = () => {
      return {
        width: 0,
        height: 0,
        top: y,
        bottom: y,
        left: x + 20,
        right: x + 20
      }
    }

    console.log('entering', card.name)
    this.setState({ cardImageToShow: card.image_uris.small })
    this.setState({ showCardIamge: true })
    console.log(getBoundingClientRect())
    this.setState({
      lineEL: {
        clientWidth: 0,
        clientHeight: 0,
        getBoundingClientRect
      }
    })
  }

  handleMouseLeave = (e, card) => {
    e.preventDefault()
    console.log('leaving', card.name)
    this.setState({ showCardIamge: false })
    this.setState({ lineEL: null })
  }

  render() {
    return (
      <Paper className={useStyles.root}>
        <CardImageBox
          isOpen={this.state.showCardIamge}
          image={this.state.cardImageToShow}
          line={this.state.lineEL}
        />
        <Table className={useStyles.topRow} size="small">
          <TableHead>
            <TableRow className={useStyles.tableRow}>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">P/T</StyledTableCell>
              <StyledTableCell align="left">Cost</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.cards.map(c => (
              <CardRow
                card={c}
                handleClick={this.handleClick}
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default CardTable
