import { createMuiTheme } from "@material-ui/core/styles"
import "typeface-roboto"

export default function baseTheme() {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },

    overrides: {}
  })
}
