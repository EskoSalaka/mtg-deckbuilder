import React from 'react'
import { Grid, Typography, Link } from '@material-ui/core'
import styles from './styles'
import { count } from '../Common/utils'

export default function SideboardSection({ cards, handleMouseMove, handleMouseLeave }) {
  const classes = styles()
  const cardCount = cards ? count(cards) : 0

  return (
    <div>
      <Typography variant='h6' className={classes.sectionTitle}>
        {`Sideboard (${cardCount})`}
      </Typography>
      <Grid container direction='row' alignItems='flex-start' justify='flex-start'>
        {cards
          ? cards.map((c) => (
              <Grid item xs={4}>
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
    </div>
  )
}
