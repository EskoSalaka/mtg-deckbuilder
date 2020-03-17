import React from 'react'
import {
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import styles from './styles'
import { Link } from 'react-router-dom'
import { count } from '../Common/utils'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

function SideboardSection({ cards, handleMouseMove, handleMouseLeave }) {
  const classes = styles()
  const cardCount = cards ? count(cards) : 0

  return (
    <ExpansionPanel className={classes.expansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography variant='h6' className={classes.sectionTitle}>
          {`Sideboard (${cardCount})`}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanel}>
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
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default React.memo(SideboardSection)
