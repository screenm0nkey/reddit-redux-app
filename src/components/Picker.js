import React, {Component, PropTypes} from 'react';

export default class Picker extends Component {

  render() {
    const {items, onChange, selectedSubreddit} = this.props;
    return (
      <div className="picker">
        {items.length > 0 &&
        <select onChange={(evt => onChange(evt.target.value))} value={selectedSubreddit.subreddit}>
          <option value="default">Please Select a subreddit</option>
          {items.map(option =>
            <option value={option.subreddit} key={option.id}>{option.subreddit} [{Number(option.subscribers).toLocaleString()}]</option>
          )}
        </select>
        }
      </div>
    )
  }
}