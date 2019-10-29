import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid } from '@material-ui/core';
import { PlayArrow, Pause, SkipPrevious, SkipNext } from '@material-ui/icons';
import { connect } from 'react-redux';
import PlaySlider from '../PlaySlider/PlaySlider';
import { playAllowedType } from '../../utils/sharedPropTypes';
import { StyledCircularProgress, GridWrapper } from './PlayControls.styled';

class PlayControls extends React.PureComponent {
  render() {
    const { playAllowed, prevTrack, nextTrack, playbackStarted, onPlayPause, isPlaying } = this.props;
    return (
      <Grid container item direction="column" spacing={1}>
        <Grid container justify="center" item spacing={1}>
          <Grid item>
            <Fab onClick={prevTrack} disabled={!playAllowed} size="medium" aria-label="previous">
              <SkipPrevious />
            </Fab>
          </Grid>
          <GridWrapper item>
            <Fab onClick={onPlayPause} disabled={playbackStarted && !playAllowed} size="medium" aria-label="play">
              {isPlaying ? <Pause /> : <PlayArrow />}
            </Fab>
            {playbackStarted && !playAllowed && <StyledCircularProgress size={60} />}
          </GridWrapper>
          <Grid item>
            <Fab onClick={nextTrack} disabled={!playAllowed} size="medium" aria-label="next">
              <SkipNext />
            </Fab>
          </Grid>
        </Grid>
        <PlaySlider />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track,
  playAllowed: state.playAllowed
});

export default connect(mapStateToProps)(PlayControls);

PlayControls.propTypes = {
  playAllowed: playAllowedType.isRequired,
  // Is track currently playing or not
  isPlaying: PropTypes.bool.isRequired,
  // Callback, used to play or pause track
  onPlayPause: PropTypes.func.isRequired,
  // If user started playback for the first time or not
  playbackStarted: PropTypes.bool.isRequired,
  // Callback, which when called calls previous track to play
  prevTrack: PropTypes.func.isRequired,
  // Callback, which when called calls next track to play
  nextTrack: PropTypes.func.isRequired
};
