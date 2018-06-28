import { INIT_MAP } from '../actions/types';

/*
  interface MapStoreState {
    map?: ymaps.Map;
    markers?: ymaps.GeoObjectCollection;
    polyline?: ymaps.Polyline;
  }
*/

export const initialState = {};

function mapReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INIT_MAP:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}

export default mapReducer;
