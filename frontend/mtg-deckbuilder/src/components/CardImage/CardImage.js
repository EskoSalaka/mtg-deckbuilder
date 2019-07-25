import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import FlipButton from "../FlipButton"
import LazyLoad from "react-lazyload"
import CardImagePlaceholder from "./CardImagePlaceholder"

const styles = makeStyles({
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: "4.75% / 3.5%"
  },
  fCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: "4.75% / 3.5%",
    transform: "scaleX(-1)"
  },
  topDiv: {
    position: "relative"
  }
})

export default function CardImage({ card, placeholderWidth, placeholderHeight }) {
  const classes = styles()

  const [isTurned, setTurned] = useState(false)
  const [isFlipped, setFlipped] = useState(false)
  const [flipButtonVisible, setFlipButtonVisible] = useState(false)

  function onFlipButtonClicked(e) {
    e.preventDefault()
    if (card.layout === "transform" || card.layout === "double_faced_token") {
      setTurned(isTurned ? false : true)
    } else if (card.layout === "flip") {
      setFlipped(isFlipped ? false : true)
    }
  }

  function handleMouseEnter(e) {
    e.preventDefault()
    if (
      card.layout === "transform" ||
      card.layout === "double_faced_token" ||
      card.layout === "flip"
    ) {
      setFlipButtonVisible(true)
    }
  }

  function HandleMouseLeave(e) {
    e.preventDefault()
    if (flipButtonVisible) {
      setFlipButtonVisible(false)
    }
  }

  const frontFace =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[0].image_uris.normal
      : card.image_uris.normal

  const backFace =
    card.layout === "transform" || card.layout === "double_faced_token"
      ? card.card_faces[1].image_uris.normal
      : null

  return (
    <div className={classes.topDiv} onMouseEnter={handleMouseEnter} onMouseLeave={HandleMouseLeave}>
      <FlipButton onClickHandler={onFlipButtonClicked} isVisible={flipButtonVisible} />
      <LazyLoad offset={-500} placeholder={<CardImagePlaceholder width={"100%"} height={"100%"} />}>
        {isFlipped ? (
          <img
            className={classes.fCardImage}
            src={isTurned ? backFace : frontFace}
            alt={card.name}
          />
        ) : (
          <img
            className={classes.cardImage}
            src={isTurned ? backFace : frontFace}
            alt={card.name}
          />
        )}
      </LazyLoad>
    </div>
  )
}
