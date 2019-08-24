import React from "react";
import { connect } from "react-redux";
import soundcloud from "soundcloud";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { CLIENT_ID } from "../../privateKeys";
import {
  DEFAULT_VOLUME,
  GENRES,
  PAGE_SIZE,
  SYNONYMS
} from "../../utils/constants";
import { getRandom } from "../../utils/functions";
import PlayControls from "../PlayControls/PlayControls";
import Volume from "../Volume/Volume";
import { ContentWrapper } from "./Player.styled";
import { newTrack as newTrackAction } from "../../store/actions";

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      volume: DEFAULT_VOLUME
    };
  }

  componentDidMount() {
    soundcloud.initialize({
      client_id: CLIENT_ID
    });
    this.playSong();

    // -Test stuff- //
    window.playSong = this.playSong;
    window.soundcloud = soundcloud;
    // --- //
  }

  getTrack = (searchTerm, trackId) => {
    try {
      if (trackId) {
        return soundcloud
          .get("/tracks", {
            ids: trackId
          })
          .then(track => track[0]);
      }
      return soundcloud
        .get("/tracks", {
          q: getRandom(SYNONYMS[searchTerm]),
          genres: GENRES,
          limit: PAGE_SIZE
        })
        .then(trackList => getRandom(trackList));
    } catch (e) {
      return new Promise(() => Promise.reject(e));
    }
  };

  playSong = async trackId => {
    const { volume } = this.state;
    const { newTrack } = this.props;
    try {
      const trackInfo = await this.getTrack("rainy", trackId);
      const track = await soundcloud.stream(`/tracks/${trackInfo.id}`);
      // -Test stuff- //
      console.log("trackInfo: ", trackInfo);
      window.track = track;
      // --- //
      await track.play();
      track.setVolume(volume);
      newTrack(track, trackInfo);
      console.log("Playback started!");
    } catch (e) {
      console.error("Playback rejected.", e);
      this.playSong();
    }
  };

  changeVolume = volume => {
    const { track } = this.props;
    if (track) track.setVolume(volume);
    this.setState({ volume });
  };

  render() {
    // https://developers.soundcloud.com/docs/api/sdks#javascript
    // https://developers.soundcloud.com/docs/api/guide#playing
    const { volume } = this.state;

    return (
      <ContentWrapper>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <div>
            <Grid
              container
              item
              direction="column"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography>TrackName</Typography>
              </Grid>
              <Grid item>
                <Typography>Author</Typography>
              </Grid>
              <Grid item>
                <PlayControls playSong={this.playSong} />
              </Grid>
            </Grid>
          </div>
          <Grid item>
            <Volume
              volume={volume}
              changeVolume={this.changeVolume}
              aria-label="volume"
            />
          </Grid>
        </Grid>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track
});

const mapDispatchToProps = dispatch => ({
  newTrack: (history, trackIndex) =>
    dispatch(newTrackAction(history, trackIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
