import React, { Component } from 'react';
import './style.scss';

class Marker extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="marker">
        <div className="pin" />
        <div className="pulse" />
      </div>
    );
  }
}

export default Marker;
