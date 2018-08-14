import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectRefinementList } from 'react-instantsearch/connectors';
import supercluster from 'points-cluster';
import geohash from 'ngeohash';
import { setHash } from '../../actions';

class ClusterListener extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    hash: React.PropTypes.number.isRequired
  };

  componentWillUpdate(nextProps) {
    const cl = supercluster(
      nextProps.items.map(i => {
        const p = geohash.decode(i.label);
        return Object.assign(i, {
          lat: p.latitude,
          lng: p.longitude
        });
      })
    );

    if (nextProps.bounds.length === 4) {
      const res = cl({
        bounds: {
          nw: {
            lat: nextProps.bounds[0],
            lng: nextProps.bounds[1]
          },
          se: {
            lat: nextProps.bounds[2],
            lng: nextProps.bounds[3]
          }
        },
        zoom: nextProps.zoom - 2
      }).map(c => ({
        count: c.points.reduce((v, n) => v + n.count, 0),
        lat: c.wy,
        lng: c.wx,
        label: c.points[0].label
      }));

      this.props.dispatch(
        setHash(
          this.props.hash,
          res.map(i => {
            i.type = 'CLUSTER';
            return i;
          })
        )
      );
      return;
    }

    const res = cl({
      bounds: {
        nw: {
          lat: nextProps.bounds[0],
          lng: nextProps.bounds[1]
        },
        se: {
          lat: nextProps.bounds[2],
          lng: nextProps.bounds[3]
        }
      },
      zoom: nextProps.zoom - 2
    })
      .map(c => ({
        count: c.points.reduce((v, n) => v + n.count, 0),
        lat: c.wy,
        lng: c.wx,
        label: c.points[0].label
      }))
      .concat(
        cl({
          bounds: {
            nw: {
              lat: nextProps.bounds[4],
              lng: nextProps.bounds[5]
            },
            se: {
              lat: nextProps.bounds[6],
              lng: nextProps.bounds[7]
            }
          },
          zoom: nextProps.zoom - 2
        }).map(c => ({
          count: c.points.reduce((v, n) => v + n.count, 0),
          lat: c.wy,
          lng: c.wx,
          label: c.points[0].label
        }))
      );

    this.props.dispatch(
      setHash(
        this.props.hash,
        res.map(i => {
          i.type = 'CLUSTER';
          return i;
        })
      )
    );
  }
  render() {
    return null;
  }
}

const VirtualClusterListener = connect()(
  connectRefinementList(ClusterListener)
);

const Clusters = connect(state => {
  return {
    zoom: state.zoom,
    bounds: state.bounds
  };
})(({ bounds, zoom }) => {
  return (
    <div>
      <VirtualClusterListener
        attributeName="hash1"
        hash={1}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
      <VirtualClusterListener
        attributeName="hash2"
        hash={2}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
      <VirtualClusterListener
        attributeName="hash3"
        hash={3}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
      <VirtualClusterListener
        attributeName="hash4"
        hash={4}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
      <VirtualClusterListener
        attributeName="hash5"
        hash={5}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
      <VirtualClusterListener
        attributeName="hash7"
        hash={7}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
      <VirtualClusterListener
        attributeName="hash8"
        hash={8}
        bounds={bounds}
        zoom={zoom}
        limitMin={100}
      />
    </div>
  );
});

export default Clusters;
