import React, { Component, PropTypes } from 'react';

export default class LastUpdated extends Component {
  render () {
    const {items, date, showRefresh, handleRefresh} = this.props;
    return (
      <div className="last-updated">
        {items.length === 0 &&
          <div>Loading Reddit list</div>
        }
        {date &&
        <span className="refresh-date"><strong> Last updated at</strong> {' ['}{date}.{'] '}</span>
        }
        {showRefresh &&
          <button onClick={handleRefresh}>Refresh</button>
        }
      </div>
    )
  }
}