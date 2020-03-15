import { makeStyles } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const styles = makeStyles({
  topPaper: { padding: 0, maxWidth: 1300 },
  basicLandsGrid: { maxWidth: 120, padding: 10 },
  deckbuilderAppbar: { background: 'tan' },
  deckBuilderToolbar: { justifyContent: 'right', minHeight: '48px' },
  contentsGrid: { padding: 20 },
  cardImageBox: { maxWidth: 250, minWidth: 250 },
  statsfab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 120,
    right: 90,
    position: 'fixed',
    backgroundColor: blue[800],
    '&:hover': {
      backgroundColor: blue[900]
    }
  },
  donefab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 120,
    right: 25,
    position: 'fixed',
    backgroundColor: blue[800],
    '&:hover': {
      backgroundColor: blue[900]
    }
  },
  landsfab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 120,
    right: 155,
    position: 'fixed',
    backgroundColor: blue[800],
    '&:hover': {
      backgroundColor: blue[900]
    }
  },
  landsPopover: {}
})

export default styles
