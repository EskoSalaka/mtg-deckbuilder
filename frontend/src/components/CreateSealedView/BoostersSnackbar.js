import React from 'react'
import { Button, Box, Grid, Typography } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './styles'
import SetIcon from '../Common/SetIcon'

export default function BoostersSnackbar({ open, booster, handleClose, handleUndo }) {
  const classes = styles()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={
        booster ? (
          <span id='message-id'>
            <Box display='flex' my='auto' textAlign='center'>
              <SetIcon setCode={booster.set} width={25} />
              <Box display='flex' my='auto' textAlign='center' pl={1}>
                <Typography>
                  {`Added ${booster.set.toUpperCase()} (${booster.commons} / ${
                    booster.uncommons
                  } / ${booster.rares})`}
                </Typography>
              </Box>
            </Box>
          </span>
        ) : (
          ''
        )
      }
      action={[
        <Button key='undo' color='secondary' size='small' onClick={handleUndo}>
          UNDO
        </Button>,
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}
