import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch/dom';
import algoliasearch from 'algoliasearch';
import Cluster from '../../components/Cluster';
import Marker from '../../components/Marker';
import Clusters from '../Clusters';
import Markers from '../Markers';
import Map from '../Map';
import './style.scss';

const client = algoliasearch('APP_ID', 'API_KEY');

const getHashFromZoom = state => {
  const zoom = state.zoom;
  if (zoom < 6) {
    return state.hashes[2];
  }
  if (zoom < 8) {
    return state.hashes[3];
  }
  if (zoom < 10) {
    return state.hashes[4];
  }
  if (zoom < 11) {
    return state.hashes[7];
  }
  if (zoom < 12) {
    return state.hashes[8];
  }

  return state.hits;
};

function buildOverlays(overlays) {
  return overlays.map(o => {
    if (o.type === 'CLUSTER') {
      if (o.count !== 1) {
        return (
          <Cluster key={o.label} count={o.count} lat={o.lat} lng={o.lng} />
        );
      }

      return <Marker key={o.label} lat={o.lat} lng={o.lng} />;
    }
    if (o.type === 'MARKER') {
      console.log(o);
      return (
        <Marker key={o.objectID} lat={o._geoloc.lat} lng={o._geoloc.lng} />
      );
    }
    return null;
  });
}

class App extends Component {
  static propTypes = {
    overlays: React.PropTypes.array,
    bounds: React.PropTypes.string
  };

  render() {
    const overlays = buildOverlays(this.props.overlays);
    client.clearCache();
    return (
      <InstantSearch
        appId="59OB5AJ41S"
        onSearchStateChange={this.handleSearchStateChange}
        apiKey="a364d77f9e296ab5efe1480e085a2279"
        indexName="ufo_map"
      >
        <div className="searchbox">
          <SearchBox />
        </div>
        <Configure
          maxValuesPerFacet={100}
          hitsPerPage={1000}
          insideBoundingBox={this.props.bounds}
        />
        <Clusters />
        <Markers />
        <div style={{ width: '100vw', height: '100vh' }}>
          <Map>
            {overlays}
          </Map>
        </div>
      </InstantSearch>
    );
  }
}

export default connect(state => {
  return {
    overlays: getHashFromZoom(state),
    bounds: state.bounds.join(',')
  };
})(App);
