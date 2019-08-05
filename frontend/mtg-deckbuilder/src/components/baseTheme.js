import { createMuiTheme } from "@material-ui/core/styles"
import "typeface-roboto"

export default function baseTheme() {
  return createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: "roboto"
    },
    overrides: {
      MuiTableCell: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
          "&:last-child": {
            paddingRight: 0
          }
        }
      }
    }
  })
}
