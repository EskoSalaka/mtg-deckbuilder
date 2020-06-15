import React from 'react'

import decksService from '../../api/decks'
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
    marginBottom: 32,
  },
})

export default function UserDecksView() {
  const classes = styles()
  const [{ data, loading, error }] = decksService.useGetUserDecks()
  console.log(data)

  if (error) throw error

  return (
    <div>
      {loading && <Loading />}
      {data && (
        <Container className={classes.mainContainer}>
          <UserDecksTable decksInfo={data.decks} />
        </Container>
      )}
    </div>
  )
}
