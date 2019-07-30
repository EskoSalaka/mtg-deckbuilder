import React from "react"
import cardsService from "./services/cards"
import MTGAppBar from "./components/MTGAppBar"
import MTGFooter from "./components/MTGFooter"
import CardTable from "./components/CardTable/CardTable"
import { Container, withStyles, Divider } from "@material-ui/core"
import SetView from "./components/SetView"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import mock_cards from "./stories/mock_cards"

const styles = theme => ({
  rootContainer: {
    backgroundColor: "#e6e3e3"
  },
  content: {
    display: "flex",
    maxWidth: "2600",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  divider: {
    height: "2px"
  },
  footer: {
    marginTop: "10px",
    backgroundColor: "white"
  }
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  async componentDidMount() {
    let cards = mock_cards().slice(1, 100)
    let c = cards

    this.setState({ cards: c })
    console.log("====================================")
    console.log(this.state.cards)
    console.log("====================================")
  }

  render() {
    const { classes } = this.props
    console.log("====================================")
    console.log(this.state.cards)
    console.log("====================================")
    return (
      <div className={classes.root}>
        <MTGAppBar />
        <Container className={classes.mainContainer} justify="center">
          {this.state.cards ? <CardTable cards={this.state.cards} /> : null}
        </Container>
        <Divider className={classes.divider} />
        <MTGFooter />
      </div>
    )
  }
}

export default withStyles(styles)(App)
