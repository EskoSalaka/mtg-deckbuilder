import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32
  }
}))

function HomeView() {
  const classes = useStyles()

  return (
    <Box display='flex' justifyContent='center' pt={3}>
      <Box display='flex' flexDirection='column' maxWidth='800px' fontFamily='roboto'>
        <Box pb={3} textAlign='center' fontFamily='roboto'>
          <Typography variant='h5'>MTG deckbuilder</Typography>
        </Box>
        <Box pb={3} maxWidth='800px'>
          <Box pb={1}>
            <Typography>
              Mtg deckbuilder is a little project of mine to get more accustomed to full stack
              development with React, Flask and plenty of other technologies and create something
              cool at the same time. With this handy tool, you can create, edit and save highly
              customized sealed decks for your own fun.
            </Typography>
          </Box>
          <Box pb={1}>
            <Typography>
              Pretty much only for practice purposes, I added many similar functionalities that are
              already done by Scryfall. The PostgreSQL database I use contains mostly the same
              publicly available Scryfall data in the same format along with whatever else I need
              for the site, such as User data.
            </Typography>
          </Box>
          <Box pb={1}>
            <Typography>
              There isn't much to show off yet, but what you can do is take a look at{' '}
              <Link to='/sets'>Sets</Link>, some <Link to='/cards/pm20'>Cards</Link>,{' '}
              <Link to='/signup'>Sign up</Link> and{' '}
              <Link to='/decks/new'>Create some sealed decks</Link>! After selecting the packs you
              want to generate the cards from and creating the deck, you can then view your own
              decks <Link to='/user/decks'>here</Link> and edit them in the deckbuilding mode by
              clicking on the "edit" button. There are plenty of missing and buggy things, but at
              this stage new things will be easy to add
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(HomeView)
