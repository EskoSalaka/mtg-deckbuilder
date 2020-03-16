import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import styles from './styles'
import { Link } from 'react-router-dom'
import { count } from '../Common/utils'

function SideboardSection({ cards, handleMouseMove, handleMouseLeave }) {
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
              <Grid item xs={4} key={c.id}>
                <Typography variant='body2'>
                  <Link
                    className={classes.cardLink}
                    to={`/cards/${c.set}/${c.collector_number}`}
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

export default React.memo(SideboardSection)
