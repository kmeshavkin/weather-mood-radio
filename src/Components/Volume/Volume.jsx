import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { StyledSlider } from './Volume.styled';
import { DEFAULT_VOLUME } from '../../utils/constants';

const Volume = ({ volume, changeVolume }) => {
  return (
    <Grid container item direction="column">
      <Grid item>
        <VolumeUp />
      </Grid>
      <Grid item>
        <StyledSlider
          orientation="vertical"
          value={volume}
          onChange={(e, value) => changeVolume(value)}
          step={0.01}
          max={1}
        />
      </Grid>
      <Grid item>
        <VolumeDown />
      </Grid>
    </Grid>
  );
};

export default Volume;

Volume.defaultProps = {
  volume: DEFAULT_VOLUME
};

Volume.propTypes = {
  // Current sound volume value from 0 to 1
  volume: PropTypes.number,
  /**
   * Callback to change sound volume
   * @param volume Value to change volume to
   */
  changeVolume: PropTypes.func.isRequired
};
