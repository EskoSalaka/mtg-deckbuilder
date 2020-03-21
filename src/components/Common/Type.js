import React from 'react'
import styles from './styles'

function Type({ typeLine }) {
  const classes = styles()
  const basicTypes = [
    'creature',
    'land',
    'artifact',
    'planeswalker',
    'instant',
    'sorcery',
    'enchantment'
  ]

  return (
    <>
      {typeLine
        .split(' ')
        .map((type, i) =>
          basicTypes.includes(type.toLowerCase()) ? (
            <i key={type + i} className={`${classes.typeLine} ms ms-${type.toLowerCase()}`} />
          ) : null
        )}
    </>
  )
}

export default React.memo(Type)
