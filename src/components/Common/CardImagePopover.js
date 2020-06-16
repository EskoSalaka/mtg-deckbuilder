import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const styles = makeStyles({
  popover: { zIndex: 10000000000, position: 'absolute', display: 'block', pointerEvents: 'none' },
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
      <LazyLoadImage
        alt={card.name}
        width={230}
        height={1.4 * 230}
        src={frontFaceUri}
      ></LazyLoadImage>
    </div>
  )
}
