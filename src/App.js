import React from 'react'
import MTGAppBar from './components/MTGAppBar'
import MTGFooter from './components/MTGFooter'
import { Router, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
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
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core'
import { AuthProvider } from './api/auth'
import baseTheme from './components/baseTheme'

const styles = makeStyles({
  root: {
    backgroundColor: '#e6e3e3',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
})

export default function App() {
  const classes = styles()
  const theme = baseTheme()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Helmet>
            <title>Mtg deckbuilder</title>
          </Helmet>
          <Router history={history}>
            <MTGAppBar />
            <Switch>
              <Route exact path='/' component={HomeView} />
              <Route exact path='/sets' component={SetsView} />
              <Route exact path='/cards/:code/:collector_number' component={CardInfoView} />
              <Route exact path='/cards/:code' component={SetView} />
              <Route exact path='/login/' component={LoginView} />
              <Route exact path='/signup/' component={SignUpView} />
              <PrivateRoute exact path='/decks/new' comp={CreateSealedView} />
              <PrivateRoute exact path='/decks/edit/:deckID' comp={DeckBuilderView} />
              <PrivateRoute exact path='/decks/:deckID' comp={DeckView} />
              <PrivateRoute exact path='/user/decks' comp={UserDecksView} />
            </Switch>
          </Router>

          <MTGFooter />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}
