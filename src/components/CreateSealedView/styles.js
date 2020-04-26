import { makeStyles } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const styles = makeStyles({
  paper: {
    width: 'fit-content',
    padding: 10,
  },

  boosterTextField: {
    width: 90,
  },
  popoverBottomGrid: { paddingBottom: 0 },
  cell: {
    paddingTop: 3,
    paddingBottom: 3,
    whiteSpace: 'pre',
    textDecoration: 'none',
  },
  lastCell: {
    padding: '3px 6px 3px 4px',
    paddingRight: '0px',
    whiteSpace: 'pre',
    textDecoration: 'none',
    borderBottom: '0px',
  },
  cellText: {
    fontSize: 14,
    whiteSpace: 'pre',
  },
  subheaderSecondary: { fontSize: 12 },
  subheaderPrimary: { fontSize: 14, fontWeight: 500 },
  cellTextSecondary: {
    fontSize: 10,
    whiteSpace: 'pre',
  },
  tomeIcon: {
    display: 'inline-block',
    backgroundSize: 'cover',
    filter: 'invert(100%)',
    width: 30,
    height: 30,
    fill: 'white',
    backgroundImage: "url('/tome.svg')",
  },
  tomeIconButton: { width: 30, height: 30, marginLeft: 'auto' },
  donefab: {
    margin: 0,
    top: 80,
    left: 'auto',
    bottom: 'auto',
    right: 25,
    position: 'fixed',
    backgroundColor: blue[800],
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
  boostersfab: {
    margin: 0,
    top: 80,
    left: 'auto',
    bottom: 'auto',
    right: 90,
    position: 'fixed',
    backgroundColor: blue[800],
    '&:hover': {
      backgroundColor: blue[900],
    },
  },
})

export default styles
