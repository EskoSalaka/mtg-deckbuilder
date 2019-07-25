import React from "react"
import cardsService from "./services/cards"
import MTGAppBar from "./components/MTGAppBar"
import MTGFooter from "./components/MTGFooter"
import { Container, withStyles, Divider } from "@material-ui/core"
import CardImageGrid from "./components/CardImageGrid"
import SetView from "./components/SetView"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const styles = theme => ({
  root: {
    backgroundColor: "#e6e3e3"
  },
  mainContainer: {
    flexDirection: "row",
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
    console.log("Dm")
    let cards = await cardsService.getAll()
    cards = cards.slice(20)
    this.setState({ cards })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Router>
          <MTGAppBar />
          <Container className={classes.mainContainer} justify="center">
            <Route path="/cards/:code" component={SetView} />
          </Container>
          <Divider className={classes.divider} />
          <MTGFooter />
        </Router>
      </div>
    )
  }
}

export default withStyles(styles)(App)
