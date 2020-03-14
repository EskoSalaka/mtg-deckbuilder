import React from 'react'
import MTGAppBar from './components/MTGAppBar'
import MTGFooter from './components/MTGFooter'
import { withStyles } from '@material-ui/core'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history'
import PrivateRoute from './components/PrivateRoute'

import SetView from './components/SetView'
import CardInfoView from './components/CardInfoView'
import SignUpView from './components/SignupView'
import LoginView from './components/LoginView'
import CreateSealedView from './components/CreateSealedView'
import DeckBuilderView from './components/DeckBuilderView'
import DeckView from './components/DeckView'
import SetsView from './components/SetsView'
import UserDecksView from './components/UserDecksView'
import HomeView from './components/HomeView'

const styles = (theme) => ({
  root: {
    backgroundColor: '#e6e3e3',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
})

class App extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Router history={history}>
          <MTGAppBar />
          <Switch>
            <Route exact path='/' component={HomeView} />
            <Route exact path='/sets' component={SetsView} />
            <Route exact path='/cards/:code/:collector_number' component={CardInfoView} />
            <Route exact path='/cards/:code' component={SetView} />
            <Route path='/login/' component={LoginView} />
            <Route path='/signup/' component={SignUpView} />
            <PrivateRoute path='/decks/new' component={CreateSealedView} />
            <PrivateRoute path='/decks/edit/:deckID' component={DeckBuilderView} />
            <PrivateRoute path='/decks/:deckID' component={DeckView} />

            <PrivateRoute path='/user/decks' component={UserDecksView} />
          </Switch>
        </Router>

        <MTGFooter />
      </div>
    )
  }
}

export default withStyles(styles)(App)
