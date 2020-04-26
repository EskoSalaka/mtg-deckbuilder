import React from 'react'
import styles from './styles'

import sets from '../../api/sets'
import SetsTable from './SetsTable'
import { Container } from '@material-ui/core'

import Loading from '../Common/Loading'

export default function SetsView() {
  const classes = styles()

  const [{ data, error, loading }] = sets.useGetAll()

  if (error) throw error

  return (
    <div>
      {loading && <Loading />}
      {data && (
        <Container className={classes.mainContainer}>
          <SetsTable sets={data.sets}></SetsTable>
        </Container>
      )}
    </div>
  )
}
