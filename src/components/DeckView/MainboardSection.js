import React, { useState } from 'react'
import { Typography, makeStyles, Box, Select } from '@material-ui/core'

import { Link } from 'react-router-dom'
import { group, count } from '../Common/utils'
import ManaCost from '../ManaCost'

const styles = makeStyles((theme) => ({
  root: {
    columnCount: 3,
    columnFill: 'balance',
  },
  cardLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  maindeckTitle: { fontSize: '16px', fontWeight: 550 },
  label: { paddingRight: 10 },
  sectionTitle: { paddingRight: 5 },
}))

function MainboardSection({ cards, handleMouseMove, handleMouseLeave }) {
  const classes = styles()

  const [groupBy, setGroupBy] = useState('type')

  return (
    <Box>
      <Box display='flex' flexDirection='row' alignItems='center' mb={1}>
        <Typography className={classes.maindeckTitle}>{`Maindeck (${count(cards)})`}</Typography>
        <Box display='flex' ml={3} alignItems='center'>
          <Typography className={classes.label}>Sort by</Typography>
          <Select
            inputProps={{
              style: {
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 4,
                paddingRight: 4,
                width: 110,
              },
            }}
            variant='outlined'
            native
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value={'type'}>Type</option>
            <option value={'color'}>Color</option>
            <option value={'manacost'}>Manacost</option>
            <option value={'none'}>none</option>
          </Select>
        </Box>
      </Box>

      <div className={classes.root}>
        {groupBy === 'none'
          ? cards.map((card) => (
              <Box key={card.id} component='span'>
                <Typography variant='body2'>
                  <Link
                    className={classes.cardLink}
                    to={`/cards/${card.set}/${card.collector_number}`}
                    onMouseMove={(e) => handleMouseMove(e, card)}
                    onMouseLeave={(e) => handleMouseLeave(e)}
                  >{`${card.count} ${card.name}`}</Link>
                </Typography>
              </Box>
            ))
          : Object.entries(group(cards, groupBy))
              .filter((group) => group[1].length > 0)
              .map((cardGroup) => {
                const groupCards = cardGroup[1]
                const groupName = cardGroup[0]

                return cards.length ? (
                  <Box mb={2} display='inline-block' key={groupName}>
                    <Box display='flex' alignItems='center'>
                      <Typography variant='h6' className={classes.sectionTitle}>
                        {groupBy === 'color' || groupBy === 'manacost' ? (
                          <ManaCost manaCost={groupName ? groupName.replace(',', '') : 'c'} />
                        ) : (
                          `${groupName}`
                        )}
                      </Typography>
                      <Typography variant='subtitle1' className={classes.sectionTitle}>
                        {`(${count(groupCards)})`}
                      </Typography>
                    </Box>

                    {groupCards.map((card) => (
                      <Box key={card.id} component='span'>
                        <Typography variant='body2'>
                          <Link
                            className={classes.cardLink}
                            to={`/cards/${card.set}/${card.collector_number}`}
                            onMouseMove={(e) => handleMouseMove(e, card)}
                            onMouseLeave={(e) => handleMouseLeave(e)}
                          >{`${card.count} ${card.name}`}</Link>
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : null
              })}
      </div>
    </Box>
  )
}

export default React.memo(MainboardSection)
