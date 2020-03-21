import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  root: {
    '&$expanded': {
      margin: '0px'
    }
  },
  expanded: {},
  mainContainer: {
    display: 'flex',
    flexGrow: 0,
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32
  },
  deckTitle: { fontSize: '16px', fontWeight: 500 },
  sectionTitle: { fontSize: '16px', fontWeight: 550 },
  cardImageBox: { maxWidth: 200 },
  deckListPaper: { padding: 10, maxWidth: 600 },
  divider: { marginTop: 15, marginBottom: 10 },
  cardLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  expansionPanel: {
    margin: '-10px',
    '&$expanded': {
      margin: '-15px'
    }
  }
})

export default styles
