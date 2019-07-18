import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import CardRow from "./CardRow"
import HeaderRow from "./HeaderRow"
import CardImageBox from "./CardImageBox"

const styles = theme => ({
  root: {
    marginTop: theme.spacing(3),
    overflowY: "scroll",
    maxHeight: 500
  },
  table: {
    overflowY: "scroll"
  },
  headerCell: {
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 18
    }
  }
})

class CardTable extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      cardImageToShow: "",
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
  }

  handleMouseEnter = (e, card) => {
    e.preventDefault()

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
  }

  handleMouseLeave = (e, card) => {
    e.preventDefault()
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <CardImageBox
          isOpen={this.state.showCardIamge}
          image={this.state.cardImageToShow}
          line={this.state.lineEL}
        />
        <Table className={classes.table} size="small">
          <TableHead>
            <HeaderRow />
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

export default withStyles(styles)(CardTable)
