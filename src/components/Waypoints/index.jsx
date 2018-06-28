import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import WaypointItem from './WaypointItem';
import './style';
import WaypointItemDropArea from './WaypointItemDropArea';

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
  handleInputKeydown = (event) => {
    // Enter
    if (event.keyCode === 13) {
      this.props.addWaypoint();
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
          onChange={this.handleInputChange}
          value={newWaypointName}
          onKeyDown={this.handleInputKeydown}
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
