import { makeStyles } from "@material-ui/core"

const styles = makeStyles({
  typeLine: { marginLeft: "2px" },
  errorText: { paddingLeft: 6, paddingRight: 6 },
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

export default styles
