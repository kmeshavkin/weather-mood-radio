import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@material-ui/icons";
import { Slider } from "@material-ui/core";

const PlayControls = ({
  playAllowed,
  playing,
  onPlayPause,
  prevTrack,
  nextTrack
}) => (
  <Grid container item direction="column" spacing={1}>
    <Grid container item spacing={1}>
      <Grid item>
        <Fab disabled={!playAllowed} size="medium" aria-label="previous">
          <SkipPrevious onClick={prevTrack} />
        </Fab>
      </Grid>
      <Grid item>
        <Fab disabled={!playAllowed} size="medium" aria-label="play">
          {playing ? (
            <Pause onClick={onPlayPause} />
          ) : (
            <PlayArrow onClick={onPlayPause} />
          )}
        </Fab>
      </Grid>
      <Grid item>
        <Fab disabled={!playAllowed} size="medium" aria-label="next">
          <SkipNext onClick={nextTrack} />
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

export default PlayControls;
