import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

import CardImagePlaceholder from '../CardImage/CardImagePlaceholder'
import LazyLoad from 'react-lazyload'

const styles = makeStyles({
  popover: { zIndex: 10000000000, position: 'absolute', display: 'block', pointerEvents: 'none' }
})

export default function CardImagePopover({ card, anchorPosition }) {
  const classes = styles()

  const [frontFaceUri, setFrontFaceUri] = useState('')

  useEffect(() => {
    if (card) {
      setFrontFaceUri(
        card.layout === 'transform' || card.layout === 'double_faced_token'
          ? card.card_faces[0].image_uris.normal
          : card.image_uris.normal
      )
    }
  }, [card])

  return (
    <div className={classes.popover} style={{ left: anchorPosition.left, top: anchorPosition.top }}>
      <LazyLoad placeholder={<CardImagePlaceholder />}>
        <img src={frontFaceUri} alt={card.name} width='250px' />
      </LazyLoad>
    </div>
  )
}
