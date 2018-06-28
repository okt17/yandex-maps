import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import './style';

class WaypointItem extends React.Component {
  static propTypes = {
    deleteWaypoint: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    waypoint: PropTypes.object.isRequired,
  };
  handleDeleteButtonClick = () => (
    this.props.deleteWaypoint(this.props.waypoint.id)
  );
  handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('waypoint', this.props.index);

    return true;
  };
  render() {
    const { waypoint } = this.props;

    return (
      <div
        className='app__waypoints__item'
        draggable
        onDragStart={this.handleDragStart}
      >
        {JSON.stringify(waypoint)}

        <Button onClick={this.handleDeleteButtonClick}>
          X
        </Button>
      </div>
    );
  }
}

export default WaypointItem;
