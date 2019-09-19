import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Grid } from '@material-ui/core';
import { PlayArrow, Pause, SkipPrevious, SkipNext } from '@material-ui/icons';
import { connect } from 'react-redux';
import PlaySlider from '../PlaySlider/PlaySlider';
import { trackType, playAllowedType } from '../../utils/sharedPropTypes';
import { CircularProgressStyled, GridWrapper } from './PlayControls.styled';

class PlayControls extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      playbackStarted: false
    };
  }

  onPlayPause = () => {
    const { playbackStarted } = this.state;
    const { track, startPlayback } = this.props;
    if (!playbackStarted) this.setState({ playbackStarted: true }, () => startPlayback());
    else if (track.isPlaying()) track.pause();
    else track.play();
    this.forceUpdate();
  };

  render() {
    const { playbackStarted } = this.state;
    const { track, playAllowed, prevTrack, nextTrack } = this.props;
    return (
      <Grid container item direction="column" spacing={1}>
        <Grid container justify="center" item spacing={1}>
          <Grid item>
            <Fab onClick={prevTrack} disabled={!playAllowed} size="medium" aria-label="previous">
              <SkipPrevious />
            </Fab>
          </Grid>
          <GridWrapper item>
            <Fab onClick={this.onPlayPause} disabled={playbackStarted && !playAllowed} size="medium" aria-label="play">
              {track && track.isPlaying() ? <Pause /> : <PlayArrow />}
            </Fab>
            {playbackStarted && !playAllowed && <CircularProgressStyled size={60} />}
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

PlayControls.defaultProps = {
  track: undefined
};

PlayControls.propTypes = {
  track: trackType,
  playAllowed: playAllowedType.isRequired,
  // Callback, used to start playback when player first opened
  startPlayback: PropTypes.func.isRequired,
  // Callback, which when called calls previous track to play
  prevTrack: PropTypes.func.isRequired,
  // Callback, which when called calls next track to play
  nextTrack: PropTypes.func.isRequired
};
