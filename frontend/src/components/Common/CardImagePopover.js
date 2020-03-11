import React from 'react'
import { makeStyles } from '@material-ui/styles'

import CardImagePlaceholder from '../CardImage/CardImagePlaceholder'
import LazyLoad from 'react-lazyload'

const styles = makeStyles({
  popover: { zIndex: 10000000000, position: 'absolute', display: 'block', pointerEvents: 'none' }
})

export default function CardImagePopover({ card, anchorPosition }) {
  const classes = styles()

  return (
    <div className={classes.popover} style={{ left: anchorPosition.left, top: anchorPosition.top }}>
      <LazyLoad placeholder={<CardImagePlaceholder />}>
        <img src={card.image_uris.normal} alt={card.image_uris.small} width='200px' />
      </LazyLoad>
    </div>
  )
}
