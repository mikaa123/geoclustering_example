import { combineReducers } from 'redux';
import {
  SET_ZOOM,
  SET_HASH,
  SET_HITS,
  SET_BOUNDS
} from './../actions';

const zoom = (state = 0, action) => {
  switch (action.type) {
    case SET_ZOOM:
      return action.zoom;
    default:
      return state;
  }
};

const bounds = (state = [], action) => {
  switch (action.type) {
    case SET_BOUNDS:
      return action.bounds;
    default:
      return state;
  }
};

const hits = (state = [], action) => {
  switch (action.type) {
    case SET_HITS:
      return action.overlays;
    default:
      return state;
  }
};

const hashes = (state = [[], [], [], [], [], [], [], []], action) => {
  const res = [].concat(state);
  switch (action.type) {
    case SET_HASH:
      res[action.zoom] = action.overlays;
      return res;
    default:
      return res;
  }
};

const rootReducer = combineReducers({
  zoom,
  bounds,
  hits,
  hashes
});

export default rootReducer;
