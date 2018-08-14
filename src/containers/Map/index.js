import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { setZoom, setBounds } from '../../actions';
import styles from './mapStyle';

class Map extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    children: React.PropTypes.array
  };

  handleOnBoundsChange = (center, zoom, bounds) => {
    this.props.dispatch(setZoom(zoom));

    if (bounds[1] > bounds[3]) {
      this.props.dispatch(
        setBounds([
          bounds[0],
          bounds[1],
          -90,
          180,
          90,
          -180,
          bounds[2],
          bounds[3]
        ])
      );
      return;
    }

    this.props.dispatch(
      setBounds([bounds[0], bounds[1], bounds[2], bounds[3]])
    );
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={{ lat: 46.22, lng: 2.21 }}
        defaultZoom={3}
        minZoom={3}
        onBoundsChange={this.handleOnBoundsChange}
        options={{
          styles
        }}
      >
        {this.props.children}
      </GoogleMapReact>
    );
  }
}

export default connect()(Map);
