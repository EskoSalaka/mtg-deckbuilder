import React from 'react'
import styles from './styles'

export default function SetIcon({ setCode, colorStyle, width, height }) {
  const classes = styles()

  return (
    <img
      className={
        colorStyle === 'common'
          ? classes.common
          : colorStyle === 'uncommon'
          ? classes.uncommon
          : colorStyle === 'rare'
          ? classes.rare
          : classes.mythic
      }
      src={`${process.env.PUBLIC_URL}/set_icons/${setCode}.svg`}
      alt='ico'
      width={width}
      height={height}
    />
  )
}
