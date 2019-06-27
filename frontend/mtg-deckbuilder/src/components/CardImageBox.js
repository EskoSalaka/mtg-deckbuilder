import React, { Component } from 'react'
import Popper from '@material-ui/core/Popper'

export default class CardImageBox extends Component {
  render() {
    return (
      <Popper
        anchorEl={this.props.line}
        placement="top-end"
        id={this.props.cardapi_id}
        open={this.props.isOpen}>
        <img src={this.props.image} alt="" />
      </Popper>
    )
  }
}
