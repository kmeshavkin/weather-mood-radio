/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import Player from './Components/Player/Player';
import getWeather from './utils/getWeather';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      playbackStarted: false
    };
  }

  componentDidMount() {
    getWeather().then(weather => {
      this.setState({ weather });
    });
  }

  render() {
    const { playbackStarted, weather } = this.state;
    console.log('weather: ', weather);
    return (
      <>
        {playbackStarted ? (
          ''
        ) : (
          <Button variant="contained" onClick={() => this.setState({ playbackStarted: true })}>
            Start Playback!
          </Button>
        )}
        <Player key={playbackStarted} playbackStarted={playbackStarted} weather={weather} />
      </>
    );
  }
}

export default App;
