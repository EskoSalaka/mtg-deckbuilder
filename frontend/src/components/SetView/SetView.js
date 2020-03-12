import React, { useState, useCallback } from 'react'

import { useParams } from 'react-router-dom'

import setsService from '../../services/sets'
import CardImageGrid from '../CardImageGrid/CardImageGrid'
import CardTable from '../CardTable'
import {
  Container,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core'
import styles from './styles'
import SetTitle from './SetTitle'
import Loading from '../Common/Loading'

export default function SetView() {
  const classes = styles()
  const { code: setCode } = useParams()

  const [cardsData, cardsError, isLoadingCards] = setsService.useFetchSetData(`${setCode}/cards/`)
  const [setdata, setError, isLoadingSet] = setsService.useFetchSetData(setCode)

  // #TODO const [sortBy, setSortBy] = useState('Name')
  const [show, setShow] = useState('checklist')

  const handleChange = useCallback((e) => {
    if (e.target.name === 'show') {
      setShow(e.target.value)
    }
  })

  return (
    <div>
      {(isLoadingCards || isLoadingSet) && <Loading />}
      {cardsData && setdata && (
        <>
          <AppBar position='sticky' color='default'>
            <Container maxWidth='lg'>
              <Toolbar className={classes.subToolbar} variant='dense'>
                <SetTitle set={setdata}></SetTitle>
                <div className={classes.grow} />
                <FormControl className={classes.formControl}>
                  <InputLabel>Show</InputLabel>
                  <Select
                    id='show'
                    value={show}
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left'
                      }
                    }}
                    inputProps={{
                      name: 'show',
                      id: 'show'
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={'checklist'}>Checklist</MenuItem>
                    <MenuItem value={'images'}>Images</MenuItem>
                  </Select>
                </FormControl>
              </Toolbar>
            </Container>
          </AppBar>
          <Container className={classes.mainContainer}>
            {show === 'images' ? (
              <CardImageGrid cards={cardsData.data} />
            ) : (
              <CardTable cards={cardsData.data}></CardTable>
            )}
          </Container>
        </>
      )}
    </div>
  )
}
