import React from "react"
import styles from "./styles"
import AddCircleIcon from "@material-ui/icons/AddCircleOutlined"

import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { Typography, Box, Tooltip } from "@material-ui/core"
import SetIcon from "../Common/SetIcon"
import IconButton from "@material-ui/core/IconButton"

export default function SetsTableRow({ set, handleAddButtonClick }) {
  const classes = styles()

  return (
    <TableRow className={classes.row} id={set.code} hover>
      <TableCell key="name" className={classes.cell}>
        <Box display="flex">
          <Box mr={2} display="flex">
            <SetIcon setCode={set.code} colorStyle="common" width={18} />
          </Box>
          <Typography className={classes.cellText}>{set.name}</Typography>
          <Box ml={2} display="flex" color="text.secondary">
            <Typography className={classes.cellTextSecondary}>{set.code.toUpperCase()}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell key="count" className={classes.cell}>
        <Typography className={classes.cellText}>{set.card_count}</Typography>
      </TableCell>
      <TableCell key="date" className={classes.cell}>
        <Typography className={classes.cellText}>{set.released_at}</Typography>
      </TableCell>
      <TableCell key="tools" className={classes.lastCell}>
        <Tooltip title="Add a booster" aria-label="Add a booster">
          <IconButton
            id={set.code}
            color="primary"
            size="small"
            onClick={e => handleAddButtonClick(e)}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
