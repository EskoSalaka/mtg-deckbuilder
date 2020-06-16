import React from 'react'
import styles from './styles'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function SetIcon({ setCode, colorStyle, width, height }) {
  const classes = styles()

  return (
    <LazyLoadImage
      className={
        colorStyle === 'common'
          ? classes.common
          : colorStyle === 'uncommon'
          ? classes.uncommon
          : colorStyle === 'rare'
          ? classes.rare
          : classes.mythic
      }
      alt='ico'
      width={width}
      src={`${process.env.PUBLIC_URL}/set_icons/${setCode}.svg`}
    ></LazyLoadImage>
  )
}
