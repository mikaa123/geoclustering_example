import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectHits } from 'react-instantsearch/connectors';
import { setHits } from '../../actions';

class HitsListener extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  };

  componentWillUpdate(nextProps) {
    this.props.dispatch(
      setHits(
        nextProps.hits.map(i => {
          i.type = 'MARKER';
          return i;
        })
      )
    );
  }

  render() {
    return null;
  }
}

const VirtualHits = connect()(connectHits(HitsListener));

const Markers = () => {
  return (
    <div>
      <VirtualHits />
    </div>
  );
};

export default Markers;
