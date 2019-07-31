import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles({
  common: {},
  uncommon: {
    filter:
      "invert(35%) sepia(80%) saturate(100%) hue-rotate(173.7deg) brightness(161.4%) contrast(103.4%)"
  },
  rare: {
    filter:
      "invert(47.5%) sepia(90%) saturate(201%) hue-rotate(3.3deg) brightness(149.2%) contrast(100%)"
  },
  mythic: {
    filter:
      "invert(30%) sepia(100%) saturate(5000%) hue-rotate(18deg) brightness(117.6%) contrast(100%)"
  }
})

export default function SetTitle({ setCode, colorStyle, width, height }) {
  const classes = styles()
  console.log("====================================")
  console.log(process.env)
  console.log("====================================")

  return (
    <img
      className={
        colorStyle === "common"
          ? classes.common
          : colorStyle === "uncommon"
          ? classes.uncommon
          : colorStyle === "rare"
          ? classes.rare
          : classes.mythic
      }
      src={`${process.env.PUBLIC_URL}/set_icons/${setCode}.svg`}
      alt="ico"
      width={width}
      height={height}
    />
  )
}
