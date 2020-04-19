import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { VolumeUp, VolumeDown } from '@material-ui/icons';
import { StyledSlider, StyledGrid } from './Volume.styled';
import { DEFAULT_VOLUME } from '../../utils/constants';

const Volume = ({ volume, changeVolume }) => {
  return (
    <StyledGrid container item direction="column">
      <Grid item>
        <VolumeUp />
      </Grid>
      <StyledGrid item>
        <StyledSlider
          orientation="vertical"
          value={volume}
          onChange={(e, value) => changeVolume(value)}
          step={0.01}
          max={1}
        />
      </StyledGrid>
      <Grid item>
        <VolumeDown />
      </Grid>
    </StyledGrid>
  );
};

export default Volume;

Volume.defaultProps = {
  volume: DEFAULT_VOLUME,
};

Volume.propTypes = {
  // Current sound volume value from 0 to 1
  volume: PropTypes.number,
  /**
   * Callback to change sound volume
   * @param volume Value to change volume to
   */
  changeVolume: PropTypes.func.isRequired,
};
