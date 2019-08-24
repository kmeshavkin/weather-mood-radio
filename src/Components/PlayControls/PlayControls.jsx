import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@material-ui/icons";
import { connect } from "react-redux";
import { changeTrack as changeTrackAction } from "../../store/actions";
import PlaySlider from "./PlaySlider";

class PlayControls extends React.PureComponent {
  onPlayPause = () => {
    const { track } = this.props;
    if (track.isPlaying()) track.pause();
    else track.play();
    this.forceUpdate();
  };

  prevTrack = () => {
    const {
      playHistory: [...playHistory],
      currentTrackIndex,
      playSong,
      changeTrack
    } = this.props;
    if (currentTrackIndex > 0) {
      playSong(playHistory[currentTrackIndex - 1]);
      changeTrack(playHistory, currentTrackIndex - 1);
    }
    console.log("Previous Track", playHistory, currentTrackIndex - 1);
  };

  nextTrack = () => {
    const {
      playHistory: [...playHistory],
      currentTrackIndex,
      trackInfo,
      changeTrack,
      playSong
    } = this.props;
    if (currentTrackIndex < playHistory.length) {
      playSong(playHistory[currentTrackIndex + 1]);
    } else {
      playHistory.push(trackInfo.id);
      playSong();
    }

    changeTrack(playHistory, currentTrackIndex + 1);
    console.log("Next Track", playHistory, currentTrackIndex + 1);
  };

  render() {
    const { track, playAllowed } = this.props;
    return (
      <Grid container item direction="column" spacing={1}>
        <Grid container item spacing={1}>
          <Grid item>
            <Fab
              onClick={this.prevTrack}
              disabled={!playAllowed}
              size="medium"
              aria-label="previous"
            >
              <SkipPrevious />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              onClick={this.onPlayPause}
              disabled={!playAllowed}
              size="medium"
              aria-label="play"
            >
              {track && track.isPlaying() ? <Pause /> : <PlayArrow />}
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              onClick={this.nextTrack}
              disabled={!playAllowed}
              size="medium"
              aria-label="next"
            >
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
  trackInfo: state.trackInfo,
  playHistory: state.playHistory,
  currentTrackIndex: state.currentTrackIndex,
  playAllowed: state.playAllowed
});

const mapDispatchToProps = dispatch => ({
  changeTrack: (track, trackInfo) =>
    dispatch(changeTrackAction(track, trackInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayControls);
