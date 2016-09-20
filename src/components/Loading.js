import React, { Component } from 'react';
import * as s from '../styles';

export default class Loading extends Component {
  render () {
    let el = <div></div>;
    if (this.props.loading) {
      el = <div className="loading" style={s.divStyle}>{this.props.loading}</div>;
    }
    return (el);
  }
}