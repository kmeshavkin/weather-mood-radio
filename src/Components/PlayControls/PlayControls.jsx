import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@material-ui/icons";
import { Slider } from "@material-ui/core";
import { connect } from "react-redux";
import { changeTrack as changeTrackAction } from "../../store/actions";

const PlayControls = ({
  track,
  trackInfo,
  playHistory: [...playHistory],
  currentTrackIndex,
  playAllowed,
  playSong,
  changeTrack
}) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const onPlayPause = () => {
    if (track.isPlaying()) track.pause();
    else track.play();
    forceUpdate();
  };

  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      playSong(playHistory[currentTrackIndex - 1]);
      changeTrack(playHistory, currentTrackIndex - 1);
    }
    console.log("Previous Track", playHistory, currentTrackIndex - 1);
  };

  const nextTrack = () => {
    if (currentTrackIndex < playHistory.length) {
      playSong(playHistory[currentTrackIndex + 1]);
    } else {
      playHistory.push(trackInfo.id);
      playSong();
    }

    changeTrack(playHistory, currentTrackIndex + 1);
    console.log("Next Track", playHistory, currentTrackIndex + 1);
  };

  return (
    <Grid container item direction="column" spacing={1}>
      <Grid container item spacing={1}>
        <Grid item>
          <Fab
            onClick={prevTrack}
            disabled={!playAllowed}
            size="medium"
            aria-label="previous"
          >
            <SkipPrevious />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            onClick={onPlayPause}
            disabled={!playAllowed}
            size="medium"
            aria-label="play"
          >
            {track && track.isPlaying() ? <Pause /> : <PlayArrow />}
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            onClick={nextTrack}
            disabled={!playAllowed}
            size="medium"
            aria-label="next"
          >
            <SkipNext />
          </Fab>
        </Grid>
      </Grid>
      <Grid item>
        {/* Current Time */}
        <Slider value={0} onChange={() => {}} />
        {/* Song Length */}
      </Grid>
    </Grid>
  );
};

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
