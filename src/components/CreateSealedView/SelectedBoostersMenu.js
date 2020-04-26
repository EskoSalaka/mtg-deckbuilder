import React from 'react'
import {
  Popover,
  ListItemText,
  IconButton,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core'
import styles from './styles'
import SetIcon from '../Common/SetIcon'
import DeleteIcon from '@material-ui/icons/Delete'

export default function SelectedBoostersMenu({
  boosters,
  anchorEl,
  handleClose,
  handleRemoveBooster,
}) {
  const classes = styles()

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <List dense>
        {boosters.map((booster, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar>
                <SetIcon colorStyle='common' setCode={booster.set} width={25} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${booster.set.toUpperCase()} (${booster.commons}/${booster.uncommons}/${
                booster.rares
              })`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                key='close'
                aria-label='close'
                color='inherit'
                className={classes.close}
                onClick={(e) => handleRemoveBooster(e, booster)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Popover>
  )
}
