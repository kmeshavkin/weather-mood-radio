import React from "react";
import Grid from "@material-ui/core/Grid";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { StyledSlider } from "./Volume.styled";

const Volume = ({ changeVolume, volume }) => {
  const handleChange = (e, value) => {
    changeVolume(value);
  };

  return (
    <Grid container item direction="column" spacing={1}>
      <Grid item>
        <VolumeUp />
      </Grid>
      <Grid item>
        <StyledSlider
          orientation="vertical"
          value={volume}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <VolumeDown />
      </Grid>
    </Grid>
  );
};

export default Volume;
