import React from 'react';
import PropTypes from 'prop-types';
import './style';

const BCN = 'app__waypoints__drop-area'; // Base Class Name

class WaypointItemDropArea extends React.PureComponent {
  state = {};
  static propTypes = {
    index: PropTypes.number.isRequired,
    moveWaypoint: PropTypes.func.isRequired,
  };
  handleDrop = (event) => {
    event.preventDefault();

    const index = parseInt(event.dataTransfer.getData('waypoint'), 10);

    if (Number.isNaN(index) === false) {
      this.props.moveWaypoint(index, this.props.index);
    }

    if (this.state.active) {
      this.setState({ active: false });
    }
  };
  handleDragEnter = (event) => {
    event.preventDefault();

    if (event.dataTransfer.items[0].type === 'waypoint') {
      this.setState({ active: true });

      return true;
    }

    return false;
  };
  handleDragLeave = (event) => {
    event.preventDefault();

    if (this.state.active) {
      this.setState({ active: false });
    }
  };
  handleDragOver = (event) => {
    event.preventDefault();
  };
  render() {
    const { active } = this.state;

    return (
      <div
        className={`${BCN}${active ? ` ${BCN}_active` : ''}`}
        onDrop={this.handleDrop}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
      />
    );
  }
}

export default WaypointItemDropArea;
