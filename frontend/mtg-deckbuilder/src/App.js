import React from 'react'
import cardsService from './services/cards'
import CardTable from './components/CardTable'

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
    this.setState({ cards })
    console.log(this.state.cards[0])
  }

  render() {
    return (
      <div>
        <CardTable cards={this.state.cards} />
      </div>
    )
  }
}

export default App
