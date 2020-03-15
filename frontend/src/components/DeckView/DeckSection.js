import React from 'react'
import { Grid, Typography, Link } from '@material-ui/core'
import styles from './styles'
import { count } from '../Common/utils'

function DeckSection({ cards, sectionName, handleMouseMove, handleMouseLeave }) {
  const classes = styles()
  const cardCount = cards ? count(cards) : 0

  return (
    <Grid container direction='column' alignItems='flex-start' justify='center'>
      <Typography
        variant='h6'
        className={classes.sectionTitle}
      >{`${sectionName} (${cardCount})`}</Typography>
      {cards
        ? cards.map((c) => (
            <Grid item key={c.id} component='span'>
              <Typography variant='body2'>
                <Link
                  href={`/cards/${c.set}/${c.collector_number}`}
                  color='inherit'
                  onMouseMove={(e) => handleMouseMove(e, c)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                >{`${c.count} ${c.name}`}</Link>
              </Typography>
            </Grid>
          ))
        : null}
    </Grid>
  )
}

export default React.memo(DeckSection)
