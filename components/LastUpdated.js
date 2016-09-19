import React, { Component, PropTypes } from 'react';

export default class LastUpdated extends Component {
  render () {
    const {items, date, showRefresh, handleRefresh} = this.props;
    const isDateStr =  !!(date && date.substr);
    return (
      <div className="last-updated">
        {isDateStr &&
        <span className="refresh-date"><strong> Last updated at</strong> {' ['}{date}.{'] '}</span>
        }
        {showRefresh &&
          <button onClick={handleRefresh}>Refresh</button>
        }
      </div>
    )
  }
}