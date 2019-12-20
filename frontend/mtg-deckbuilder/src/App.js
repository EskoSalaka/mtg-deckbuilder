import React from "react"
import MTGAppBar from "./components/MTGAppBar"
import MTGFooter from "./components/MTGFooter"
import { Container, withStyles, Divider, Grid } from "@material-ui/core"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import history from "./history"

import SetView from "./components/SetView"
import CardInfoView from "./components/CardInfoView"

const styles = theme => ({
  root: {
    backgroundColor: "#e6e3e3",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
})

class App extends React.Component {
  async componentDidMount() {
    console.log("====================================")
    console.log("Mount")
    console.log("====================================")
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <MTGAppBar />
        <div>
          <Router history={history}>
            <Switch>
              <Route path="/cards/:code/:collector_number" component={CardInfoView} />
              <Route path="/cards/:code" component={SetView} />
            </Switch>
          </Router>
        </div>
        <Divider className={classes.divider} />
        <MTGFooter />
      </div>
    )
  }
}

export default withStyles(styles)(App)
