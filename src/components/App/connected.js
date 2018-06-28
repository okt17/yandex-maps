import merge from 'deepmerge';
import { connect } from 'react-redux';
import {
  addWaypoint,
  deleteWaypoint,
  initMap,
  moveWaypoint,
  setNewWaypointName,
} from 'app/actions';
import App from '.';

function mapStateToProps(state) {
  return {
    waypoints: state.waypoints,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    map: {
      initMap: target => dispatch(initMap(target)),
    },
    waypoints: {
      setNewWaypointName: name => dispatch(setNewWaypointName(name)),
      addWaypoint: () => dispatch(addWaypoint()),
      deleteWaypoint: id => dispatch(deleteWaypoint(id)),
      moveWaypoint: (...args) => dispatch(moveWaypoint(...args)),
    },
  };
}

function mergeProps(stateProps, dispatchProps) {
  return merge(stateProps, dispatchProps);
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);

export default ConnectedApp;
