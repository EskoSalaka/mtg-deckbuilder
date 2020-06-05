import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import SaveIcon from '@material-ui/icons/Save'
import PrintIcon from '@material-ui/icons/Print'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    '.MuiSpeedDial-fab': {
      width: '40px',
      height: '40px',
    },

    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      '.MuiSpeedDial-fab': {
        width: '40px',
        height: '40px',
      },
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      '.MuiSpeedDial-fab': {
        width: '40px',
        height: '40px',
      },
    },
  },
}))

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
]

function DeckTitle({ deck }) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  return (
    <Box display='flex'>
      <Box>
        <Typography variant='h6'>{`${deck.name}`}</Typography>
        <Typography variant='subtitle2'>
          {`Created at ${deck.created_at}`} <span>&#8281;</span> {`by ${deck.user}`}
        </Typography>
      </Box>
      <Box display='flex' flexGrow='1' justifyContent='end'>
        <SpeedDial
          ariaLabel='SpeedDial'
          className={classes.speedDial}
          icon={<SettingsIcon />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction='down'
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setOpen(false)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  )
}

export default React.memo(DeckTitle)
