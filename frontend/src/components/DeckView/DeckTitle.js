import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { count } from '../Common/utils'

import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Switch from '@material-ui/core/Switch'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import SaveIcon from '@material-ui/icons/Save'
import PrintIcon from '@material-ui/icons/Print'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme) => ({
  exampleWrapper: {
    position: 'relative'
  },
  radioGroup: {
    margin: theme.spacing(1, 0)
  },
  speedDial: {
    position: 'absolute',
    right: 0,
    top: 0,

    left: '',

    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      right: 0,
      top: 0,
      left: ''
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
      right: 0,
      top: 0,
      left: ''
    }
  }
}))

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' }
]

export default function DeckTitle({ deck }) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Box display='flex' position='relative'>
      <Box>
        <Typography variant='h6'>{`${deck.name} (${count(deck.mainboard)})`}</Typography>
        <Typography variant='subtitle2'>
          {`Created at ${deck.created_at}`} <span>&#8281;</span> {`by ${deck.user}`}
        </Typography>
      </Box>
      <SpeedDial
        ariaLabel='SpeedDial example'
        className={classes.speedDial}
        hidden={hidden}
        icon={<SettingsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction='down'
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}
