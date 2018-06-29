import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import WaypointItem from './WaypointItem';
import WaypointItemDropArea from './WaypointItemDropArea';
import './style';

class Waypoints extends React.Component {
  static propTypes = {
    addWaypoint: PropTypes.func.isRequired,
    deleteWaypoint: WaypointItem.propTypes.deleteWaypoint,
    moveWaypoint: WaypointItemDropArea.propTypes.moveWaypoint,
    newWaypointName: PropTypes.string,
    setNewWaypointName: PropTypes.func.isRequired,
    waypoints: PropTypes.array.isRequired,
  };
  handleInputChange = event => this.props.setNewWaypointName(event.target.value);
  handleInputFocus = (event) => {
    event.target.select();
  };
  handleInputKeydown = (event) => {
    // Enter
    if (event.keyCode === 13) {
      this.props.addWaypoint();

      // focus the input after handling the event
      const input = event.target;
      // put this on top of the event loop queue
      setTimeout(() => input.select(), 0);
    }
  };
  render() {
    const {
      deleteWaypoint,
      moveWaypoint,
      newWaypointName,
      waypoints,
    } = this.props;

    return (
      <div className='app__waypoints'>
        <Input
          autoFocus
          className='app__waypoints__input'
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleInputKeydown}
          value={newWaypointName}
        />

        {
          waypoints.map((waypoint, i) => (
            <React.Fragment key={waypoint.id}>
              <WaypointItemDropArea
                index={i}
                moveWaypoint={moveWaypoint}
              />

              <WaypointItem
                index={i}
                waypoint={waypoint}
                deleteWaypoint={deleteWaypoint}
              />
            </React.Fragment>
          ))
        }

        <WaypointItemDropArea
          index={waypoints.length}
          moveWaypoint={moveWaypoint}
        />
      </div>
    );
  }
}

export default Waypoints;
