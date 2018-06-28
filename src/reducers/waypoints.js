import {
  ADD_WAYPOINT,
  DELETE_WAYPOINT,
  MOVE_WAYPOINT,
  SET_NEW_WAYPOINT_NAME,
  UPDATE_WAYPOINT,
} from '../actions/types';
import { moveItem } from '../utils';
import settings from '../settings';

/*
  interface WaypointsStoreState {
    newWaypointName: string;
    waypoints: Waypoint[];
  }

  interface Waypoint {
    id: string; // UUID
    name: string;
    coordinates: [number, number]; // point coordinates
  }
*/

export const initialState = {
  newWaypointName: settings.DEFAULT_WAYPOINT_NAME,
  waypoints: [],
};

function waypointsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_WAYPOINT:
      return {
        ...state,
        waypoints: [
          ...state.waypoints,
          payload,
        ],
      };

    case DELETE_WAYPOINT:
      return {
        ...state,
        waypoints: state.waypoints.filter(({ id }) => id !== payload),
      };

    case MOVE_WAYPOINT: {
      const {
        oldIndex,
        newIndex,
      } = payload;

      return {
        ...state,
        waypoints: moveItem(state.waypoints, oldIndex, newIndex),
      };
    }

    case SET_NEW_WAYPOINT_NAME:
      return {
        ...state,
        newWaypointName: payload,
      };

    case UPDATE_WAYPOINT:
      return {
        ...state,
        waypoints: state.waypoints.map(waypoint => (
          waypoint.id === payload.id
            ? { ...waypoint, ...payload.data }
            : waypoint
        )),
      };

    default:
      return state;
  }
}

export default waypointsReducer;
