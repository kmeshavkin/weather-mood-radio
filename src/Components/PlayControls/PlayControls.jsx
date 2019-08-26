import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@material-ui/icons";
import { connect } from "react-redux";
import PlaySlider from "./PlaySlider";

class PlayControls extends React.PureComponent {
  onPlayPause = () => {
    const { track } = this.props;
    if (track.isPlaying()) track.pause();
    else track.play();
    this.forceUpdate();
  };

  render() {
    const { track, playAllowed, prevTrack, nextTrack } = this.props;
    return (
      <Grid container item direction="column" spacing={1}>
        <Grid container justify="center" item spacing={1}>
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
              onClick={nextTrack}
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
  playAllowed: state.playAllowed
});

export default connect(mapStateToProps)(PlayControls);
