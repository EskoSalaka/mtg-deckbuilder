import React, { useState } from 'react'
import { Grid, Box, IconButton } from '@material-ui/core'
import styles from './styles'
import ManaCost from '../ManaCost'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

export default function AddBasicLandsBox({ handleRemoveButtonClick, handleAddButtonClick }) {
  const classes = styles()

  return (
    <>
      <Box fontSize={20} flex='1'>
        <IconButton color='secondary' id='plains' onClick={handleRemoveButtonClick}>
          <RemoveCircleIcon />
        </IconButton>
        <ManaCost manaCost={'{W}'}></ManaCost>
        <IconButton color='primary' id='plains' onClick={handleAddButtonClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      <Box fontSize={20} flex='1'>
        <IconButton color='secondary' id='island' onClick={handleRemoveButtonClick}>
          <RemoveCircleIcon />
        </IconButton>
        <ManaCost manaCost={'{U}'}></ManaCost>
        <IconButton color='primary' id='island' onClick={handleAddButtonClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box fontSize={20} flex='1'>
        <IconButton color='secondary' id='swamp' onClick={handleRemoveButtonClick}>
          <RemoveCircleIcon />
        </IconButton>
        <ManaCost manaCost={'{B}'}></ManaCost>
        <IconButton color='primary' id='swamp' onClick={handleAddButtonClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box fontSize={20} flex='1'>
        <IconButton color='secondary' id='mountain' onClick={handleRemoveButtonClick}>
          <RemoveCircleIcon />
        </IconButton>
        <ManaCost manaCost={'{R}'}></ManaCost>
        <IconButton color='primary' id='mountain' onClick={handleAddButtonClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box fontSize={20} flex='1'>
        <IconButton color='secondary' id='forest' onClick={handleRemoveButtonClick}>
          <RemoveCircleIcon />
        </IconButton>
        <ManaCost manaCost={'{G}'} />
        <IconButton color='primary' id='forest' onClick={handleAddButtonClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>
    </>
  )
}
