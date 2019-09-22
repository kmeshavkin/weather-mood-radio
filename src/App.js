/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Grid, TextField } from '@material-ui/core';
import Player from './Components/Player/Player';
import { PlayerGridStyled, StatusBar } from './App.styled';
import getWeather from './utils/getWeather';
import { WEATHER_NAMES } from './utils/constants';

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = { weather: undefined };
  }

  componentDidMount() {
    getWeather().then(weather => {
      console.log('weather: ', weather, WEATHER_NAMES[weather.icon]);
      this.setState({ weather: WEATHER_NAMES[weather.icon] });
    });
  }

  render() {
    const { weather } = this.state;
    return (
      <Grid container direction="column" alignContent="center">
        <PlayerGridStyled item>
          <Player weather={weather} />
        </PlayerGridStyled>
        <StatusBar style={{ margin: 'auto' }} item>
          <TextField disabled label="Weather" value={weather || 'pending...'} margin="normal" variant="outlined" />
        </StatusBar>
      </Grid>
    );
  }
}

export default App;
