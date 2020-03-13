import React, { useState } from 'react'
import styles from './styles'

import setsService from '../../services/sets'
import SetsTable from './SetsTable'
import { Container } from '@material-ui/core'

import Loading from '../Common/Loading'

export default function SetsView() {
  const classes = styles()

  const [setsData, setsError, isLoadingSets] = setsService.useFetchSets()

  return (
    <div>
      {isLoadingSets && <Loading />}
      {setsData && (
        <Container className={classes.mainContainer}>
          <SetsTable sets={setsData.data}></SetsTable>
        </Container>
      )}
    </div>
  )
}
