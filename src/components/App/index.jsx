import React from 'react';
import PropTypes from 'prop-types';
import Map from '../Map';
import Waypoints from '../Waypoints';
import './style';

const App = ({ map, waypoints }) => (
  <div className='app'>
    <div className='app__left-pane'>
      <Waypoints {...waypoints} />
    </div>

    <div className='app__right-pane'>
      <Map {...map} />
    </div>
  </div>
);

App.propTypes = {
  map: PropTypes.object.isRequired,
  waypoints: PropTypes.object.isRequired,
};

export default App;
