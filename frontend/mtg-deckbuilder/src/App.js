import React from "react"
import MTGAppBar from "./components/MTGAppBar"
import MTGFooter from "./components/MTGFooter"
import { Container, withStyles, Divider, Grid } from "@material-ui/core"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import SetView from "./components/SetView"
import CardInfoView from "./components/CardInfoView"

const styles = theme => ({
  rootContainer: {
    backgroundColor: "#e6e3e3"
  },
  content: {
    display: "flex",

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
    console.log("====================================")
    console.log("Mount")
    console.log("====================================")
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.rootContainer}>
        <MTGAppBar />
        <Grid container className={classes.mainContainer} justify="center">
          <Router>
            <Switch>
              <Route path="/cards/:code/:collector_number" component={CardInfoView} />
              <Route path="/cards/:code" component={SetView} />
            </Switch>
          </Router>
        </Grid>
        <Divider className={classes.divider} />
        <MTGFooter />
      </div>
    )
  }
}

export default withStyles(styles)(App)
