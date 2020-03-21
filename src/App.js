import React from 'react'
import MTGAppBar from './components/MTGAppBar'
import MTGFooter from './components/MTGFooter'
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
import { makeStyles, CssBaseline } from '@material-ui/core'
import { AuthProvider } from './AuthContext'

const styles = makeStyles({
  root: {
    backgroundColor: '#e6e3e3',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
})

export default function App() {
  const classes = styles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AuthProvider>
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
      </AuthProvider>
    </div>
  )
}
