import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32
  },
  deckTitle: { fontSize: '16px', fontWeight: 500 },
  sectionTitle: { fontSize: '16px', fontWeight: 500 },
  cardImageBox: { maxWidth: 200 },
  deckListPaper: { padding: 10, maxWidth: 800 },
  divider: { marginTop: 15, marginBottom: 10 }
})

export default styles
