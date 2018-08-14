export const SET_ZOOM = 'SET_ZOOM';
export const setZoom = zoom => ({
  type: SET_ZOOM,
  zoom
});

export const SET_HASH = 'SET_HASH';
export const setHash = (zoom, overlays) => ({
  type: SET_HASH,
  zoom,
  overlays
});

export const SET_HITS = 'SET_HITS';
export const setHits = overlays => ({
  type: SET_HITS,
  overlays
});

export const SET_BOUNDS = 'SET_BOUNDS'
export const setBounds = bounds => ({
	type: SET_BOUNDS,
	bounds
})
