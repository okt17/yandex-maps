import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon } from '@material-ui/core';
import './style';

const BCN = 'app__waypoints__item'; // Base Class Name

const toFixed = n => n.toFixed(3);

class WaypointItem extends React.PureComponent {
  static propTypes = {
    deleteWaypoint: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    waypoint: PropTypes.object.isRequired,
  };
  handleDeleteButtonClick = () => this.props.deleteWaypoint(this.props.waypoint.id);
  handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('waypoint', this.props.index);

    return true;
  };
  render() {
    const {
      waypoint: {
        name,
        coordinates,
      },
    } = this.props;

    return (
      <div
        className={BCN}
        draggable
        onDragStart={this.handleDragStart}
      >
        <span className={`${BCN}__container`}>
          <div>{name}</div>

          <div>{coordinates.map(toFixed).join(', ')}</div>
        </span>

        <IconButton
          color='secondary'
          onClick={this.handleDeleteButtonClick}
          size='small'
          title='Удалить точку маршрута'
        >
          <Icon>clear</Icon>
        </IconButton>
      </div>
    );
  }
}

export default WaypointItem;
