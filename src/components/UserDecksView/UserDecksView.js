import React from 'react'

import decksService from '../../api/decks'
import { Container, Paper, Box } from '@material-ui/core'
import UserDecksTable from './UserDecksTable'
import { makeStyles } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'
import LinearLoadingWrapper from '../Common/LinearLoadingWrapper'
import useQuery from '../Common/hooks/useQuery'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const styles = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 32,
    marginBottom: 32,
    flexDirection: 'column',
    width: 'max-content',
  },
})

export default function UserDecksView() {
  let location = useLocation()
  let query = useQuery()
  let currentPage = query.has('page') ? parseInt(query.get('page')) : 1

  const [{ data, loading, error }, reFetch] = decksService.useGetUserDecks(currentPage)
  const classes = styles()

  React.useEffect(() => {
    reFetch(currentPage)
  }, [reFetch, location.key, currentPage])

  if (error) throw error

  return (
    <div>
      <Container className={classes.mainContainer}>
        <LinearLoadingWrapper loading={loading}>
          <Paper>
            <UserDecksTable decks={data?.decks} />
          </Paper>
        </LinearLoadingWrapper>
        <Box display='flex' justifyContent='center' pt={2}>
          <Pagination
            count={data?.total_pages}
            color='primary'
            page={currentPage}
            renderItem={(item) => (
              <PaginationItem component={Link} to={`/user/decks?page=${item.page}`} {...item} />
            )}
            disabled={loading}
          />
        </Box>
      </Container>
    </div>
  )
}
