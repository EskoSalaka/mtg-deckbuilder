import React, { useState } from 'react'
import styles from './styles'

import setsService from '../../services/sets'
import SetsTable from './SetsTable'
import { Container } from '@material-ui/core'

import Loading from '../Common/Loading'

export default function SetsView() {
  const classes = styles()

  const [sets, setsError, isLoadingSets] = setsService.useFetchSets()
  console.log(sets)

  return (
    <div>
      {isLoadingSets && <Loading />}
      {sets && (
        <Container className={classes.mainContainer}>
          <SetsTable sets={sets.data}></SetsTable>
        </Container>
      )}
    </div>
  )
}
