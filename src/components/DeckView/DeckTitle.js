import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import SettingsIcon from '@material-ui/icons/Settings'
import CallSplitIcon from '@material-ui/icons/CallSplit'
import GetAppIcon from '@material-ui/icons/GetApp'
import { deckToText } from '../Common/utils'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
  },
}))

function DeckTitle({ deck }) {
  const classes = useStyles()

  const [speedDialOpen, setSpeedDialOpen] = React.useState(false)

  const downloadTextFile = (e) => {
    e.preventDefault()

    let asText = deckToText(deck)
    const element = document.createElement('a')
    const file = new Blob([asText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${deck.name} by ${deck.user}.txt`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()

    setSpeedDialOpen(false)
  }

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
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
          FabProps={{ size: 'small' }}
          open={speedDialOpen}
          direction='down'
        >
          <SpeedDialAction
            key={'fork'}
            icon={<CallSplitIcon />}
            tooltipTitle={'Fork'}
            onClick={(e) => setSpeedDialOpen(false)}
          />
          <SpeedDialAction
            key={'download'}
            icon={<GetAppIcon />}
            tooltipTitle={'Download as a text file'}
            onClick={downloadTextFile}
          />
          <SpeedDialAction
            key={'share'}
            icon={<ShareIcon />}
            tooltipTitle={'Share'}
            onClick={(e) => setSpeedDialOpen(false)}
          />
          <SpeedDialAction
            key={'like'}
            icon={<FavoriteIcon />}
            tooltipTitle={'Like'}
            onClick={(e) => setSpeedDialOpen(false)}
          />
        </SpeedDial>
      </Box>
    </Box>
  )
}

export default React.memo(DeckTitle)
