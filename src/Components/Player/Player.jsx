import React from "react";
import { connect } from "react-redux";
import soundcloud from "soundcloud";
import Grid from "@material-ui/core/Grid";
import { CardContent } from "@material-ui/core";
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
import {
  StyledCard,
  StyledCardMedia,
  StyledTypography,
  StyledTitleGrid
} from "./Player.styled";
import {
  newTrack as newTrackAction,
  changeTrack as changeTrackAction
} from "../../store/actions";
import recordImg from "./record.svg";

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
      track.on("finish", () => this.nextTrack());
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

  prevTrack = () => {
    const {
      playHistory: [...playHistory],
      currentTrackIndex,
      changeTrack
    } = this.props;
    if (currentTrackIndex > 0) {
      this.playSong(playHistory[currentTrackIndex - 1]);
      changeTrack(playHistory, currentTrackIndex - 1);
    }
    console.log("Previous Track", playHistory, currentTrackIndex - 1);
  };

  nextTrack = () => {
    const {
      playHistory: [...playHistory],
      currentTrackIndex,
      trackInfo,
      changeTrack
    } = this.props;
    if (currentTrackIndex < playHistory.length) {
      this.playSong(playHistory[currentTrackIndex + 1]);
    } else {
      playHistory.push(trackInfo.id);
      this.playSong();
    }

    changeTrack(playHistory, currentTrackIndex + 1);
    console.log("Next Track", playHistory, currentTrackIndex + 1);
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
    const { trackInfo } = this.props;
    return (
      <StyledCard>
        <StyledCardMedia
          image={
            trackInfo && trackInfo.artwork_url
              ? trackInfo.artwork_url
              : recordImg
          }
          title="Cover image"
        />
        <CardContent>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <div>
              <Grid container item direction="column" alignItems="center">
                <StyledTitleGrid item>
                  <StyledTypography align="center" component="h5" variant="h5">
                    {trackInfo ? trackInfo.title : ""}
                  </StyledTypography>
                  <StyledTypography
                    align="center"
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {trackInfo ? trackInfo.user.username : ""}
                  </StyledTypography>
                </StyledTitleGrid>
                <PlayControls
                  nextTrack={this.nextTrack}
                  prevTrack={this.prevTrack}
                />
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
        </CardContent>
      </StyledCard>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track,
  trackInfo: state.trackInfo,
  playHistory: state.playHistory,
  currentTrackIndex: state.currentTrackIndex
});

const mapDispatchToProps = dispatch => ({
  newTrack: (history, trackIndex) =>
    dispatch(newTrackAction(history, trackIndex)),
  changeTrack: (track, trackInfo) =>
    dispatch(changeTrackAction(track, trackInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
