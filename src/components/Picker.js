import React, {Component, PropTypes} from 'react';

export default class Picker extends Component {

  render() {
    const {items, onChange, selectedSubreddit} = this.props;
    debugger
    return (
      <div className="picker">
        {items.length > 0 &&
        <select onChange={(evt => onChange(evt.target.value))} value={selectedSubreddit.subreddit}>
          <option value="default">Please Select a sub reddit</option>
          {items.map(option =>
            <option value={option} key={option}>{option}</option>
          )}
        </select>
        }
      </div>
    )
  }
}