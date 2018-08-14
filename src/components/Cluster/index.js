import React, { Component } from 'react';
// import './style.scss';
import './clusterMarker.scss';

class Cluster extends Component {
  static propTypes = {
    count: React.PropTypes.number.isRequired
  };

  render() {
    return (
      <div className="cluster">
        <div className="text">
          {this.props.count}
        </div>
      </div>
    );
  }
}

export default Cluster;
