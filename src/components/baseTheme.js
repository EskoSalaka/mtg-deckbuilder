import { createMuiTheme } from '@material-ui/core/styles'
import 'typeface-roboto'
import { blueGrey } from '@material-ui/core/colors'

export default function baseTheme() {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: '"Roboto"',
    },
    palette: {
      primaryToolbalButton: blueGrey[700],
      primaryToolbalButtonHover: blueGrey[800],
    },

    overrides: {},
  })
}
