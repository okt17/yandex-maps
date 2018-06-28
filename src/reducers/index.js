import { combineReducers } from 'redux';
import map from './map';
import waypoints from './waypoints';

export default combineReducers({
  map,
  waypoints,
});
