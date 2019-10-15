/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import { Grid, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import Player from './Components/Player/Player';
import { getPosition, getSeason, getWeather, getDayTime } from './utils/getMood';
import { API_TO_WEATHER, SYNONYMS, MOOD_MATRIX, WEATHER, DAY_TIME, SEASONS } from './utils/constants';
import { StyledMoodGrid, StyledCheckboxGrid, StyledTextField } from './App.styled';
import { getRandom, capitalizeFirst } from './utils/functions';

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      season: undefined,
      weather: undefined,
      dayTime: undefined,
      customMood: false
    };
  }

  componentDidMount() {
    this.retrieveMoodParams();
    this.setTimeout();
  }

  setTimeout = () => {
    this.weatherTimeout = setTimeout(() => {
      const { customMood } = this.state;
      if (!customMood) {
        this.retrieveMoodParams();
        this.setTimeout();
      }
    }, 300000);
  };

  retrieveMoodParams = async () => {
    const position = await getPosition();
    const season = getSeason(position);
    const weatherData = await getWeather(position);
    const weather = API_TO_WEATHER[weatherData.icon];
    console.log('weather: ', weatherData, weather);
    const dayTime = getDayTime(weatherData.sunriseTime, weatherData.sunsetTime);
    this.setState({ season, weather, dayTime });
  };

  calculateMood = (season = '', weather, dayTime = DAY_TIME.day) => {
    if (weather) {
      const weatherSynonym = SYNONYMS[weather] || weather;
      return MOOD_MATRIX[dayTime][weather].replace(weather, getRandom(weatherSynonym)).replace('SEASON', season);
    }
    return 'lofi';
  };

  setCustomMood = () => {
    const { customMood } = this.state;
    if (customMood) {
      this.retrieveMoodParams();
      this.setTimeout();
    }
    this.setState({ customMood: !customMood });
  };

  render() {
    const { weather, dayTime, season, customMood } = this.state;
    // textFields used to map all textFields easier as every new textField adds ton of similar code
    const textFields = [
      {
        label: 'Weather',
        value: weather,
        stateName: 'weather',
        constants: WEATHER
      },
      {
        label: 'Day time',
        value: dayTime,
        stateName: 'dayTime',
        constants: DAY_TIME
      },
      {
        label: 'Season',
        value: season,
        stateName: 'season',
        constants: SEASONS
      }
    ];
    return (
      <Grid container direction="column" alignItems="center">
        <StyledCheckboxGrid item>
          <FormControlLabel
            control={<Checkbox checked={customMood} onChange={this.setCustomMood} />}
            label="Custom Mood"
            labelPlacement="start"
          />
        </StyledCheckboxGrid>
        <Grid item>
          <Player mood={this.calculateMood(season, weather, dayTime)} />
        </Grid>
        <StyledMoodGrid item container justify="space-evenly" spacing={1}>
          {textFields.map(textField => (
            <Grid key={textField.stateName} item>
              <StyledTextField
                select={customMood}
                disabled={!customMood}
                label={textField.label}
                value={capitalizeFirst(textField.value) || 'pending...'}
                onChange={e => this.setState({ [textField.stateName]: e.target.value.toLowerCase() })}
                margin="normal"
                variant="outlined"
              >
                {Object.values(textField.constants).map(option => (
                  <MenuItem key={option} value={capitalizeFirst(option)}>
                    {capitalizeFirst(option)}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
          ))}
        </StyledMoodGrid>
      </Grid>
    );
  }
}

export default App;
