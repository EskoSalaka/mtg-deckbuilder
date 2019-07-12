import React from 'react'
import cardsService from './services/cards'
import CardTable from './components/CardTable'
import MTGAppBar from './components/MTGAppBar'
import Grid from '@material-ui/core/Grid'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  async componentDidMount() {
    console.log('Dm')
    let cards = await cardsService.getAll()
    cards = cards.slice(20)
    this.setState({ cards })
  }

  render() {
    return (
      <div>
        <MTGAppBar />

        <Grid container justify="center" spacing={10}>
          <Grid key={1} item>
            <CardTable cards={this.state.cards} />
          </Grid>
          <Grid key={2} item>
            <CardTable cards={this.state.cards} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default App
