import React from 'react';
import PropTypes from 'prop-types';
import './style';

class Map extends React.Component {
  static propTypes = {
    initMap: PropTypes.func.isRequired,
  };
  ref = React.createRef();
  componentDidMount() {
    this.props.initMap(this.ref.current);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <div className='app__map' ref={this.ref} />;
  }
}

export default Map;
