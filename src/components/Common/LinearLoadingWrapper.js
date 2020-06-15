import React from 'react'
import clsx from 'clsx'
import { makeStyles, LinearProgress, Box } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  progress: {
    position: 'absolute',
    top: -4,
    left: '0',
    right: '0',
    margin: 'auto',
  },
}))

const LinearLoadingWrapper = ({ children, loading }) => {
  const classes = useStyles()
  const successClassName = clsx({
    [children.props.className]: true,
  })

  return (
    <Box position='relative'>
      {loading && <LinearProgress className={classes.progress} />}
      {React.cloneElement(children, { disabled: loading, className: successClassName })}
    </Box>
  )
}

export default LinearLoadingWrapper
