import React from 'react'
import clsx from 'clsx'
import { makeStyles, CircularProgress, Box } from '@material-ui/core'
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
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
  },
}))

const LoadingWrapper = ({ children, loading, success, size = 30, thickness = 6 }) => {
  const classes = useStyles()
  const successClassName = clsx({
    [children.props.className]: true,
    [classes.success]: success,
  })

  return (
    <Box position='relative'>
      <children.type
        {...children.props}
        disabled={loading}
        className={successClassName}
      ></children.type>
      {loading && (
        <CircularProgress size={size} thickness={thickness} className={classes.progress} />
      )}
    </Box>
  )
}

export default LoadingWrapper
