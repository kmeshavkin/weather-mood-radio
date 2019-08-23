import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { VolumeWrapper } from './Volume.styled';

const Volume = ({ changeVolume, volume }) => {
  const handleChange = (e, value) => {
    changeVolume(value);
  };

  return (
    <VolumeWrapper>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={volume} onChange={handleChange} />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </VolumeWrapper>
  );
};

export default Volume;
