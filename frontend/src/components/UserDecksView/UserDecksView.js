import React from 'react'

import decksService from '../../services/decks'
import { Container } from '@material-ui/core'
import UserDecksTable from './UserDecksTable'
import Loading from '../Common/Loading'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32
  }
})

export default function UserDecksView() {
  const classes = styles()

  const [decksData, decksError, isLoadingDecks] = decksService.useGetUserDecks()
  console.log(decksData)

  return (
    <div>
      {isLoadingDecks && <Loading />}
      {decksData && (
        <Container className={classes.mainContainer}>
          <UserDecksTable decks={decksData.decks} />
        </Container>
      )}
    </div>
  )
}
