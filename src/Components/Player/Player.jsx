import React from "react";
import { connect } from "react-redux";
import soundcloud from "soundcloud";
import {
  CardContent,
  Grid,
  IconButton,
  Popover,
  Typography,
  Link
} from "@material-ui/core";
import { Info } from "@material-ui/icons";
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
  StyledTitleGrid,
  StyledImage
} from "./Player.styled";
import {
  newTrack as newTrackAction,
  changeTrack as changeTrackAction
} from "../../store/actions";
import recordSvg from "../../resources/record.svg";
import reactSvg from "../../resources/react.svg";
import reduxSvg from "../../resources/redux.svg";
import soundcloudImg from "../../resources/soundcloud.png";

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      volume: DEFAULT_VOLUME,
      anchorEl: null
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
    const { volume, anchorEl } = this.state;
    const { trackInfo } = this.props;
    return (
      <StyledCard>
        <StyledCardMedia
          image={
            trackInfo && trackInfo.artwork_url
              ? trackInfo.artwork_url
              : recordSvg
          }
          title="Cover image"
        />
        <CardContent>
          <Grid
            container
            justify="center"
            direction="row"
            alignItems="center"
            spacing={2}
          >
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
            <div>
              <Grid container item direction="column" justify="center">
                <Grid item>
                  <IconButton
                    onClick={event =>
                      this.setState({ anchorEl: event.currentTarget })
                    }
                    aria-label="info"
                    size="small"
                  >
                    <Info fontSize="small" />
                  </IconButton>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => this.setState({ anchorEl: null })}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                  >
                    <Typography>Powered by:</Typography>
                    <StyledImage height={30} alt="react" src={reactSvg} />
                    <StyledImage height={30} alt="redux" src={reduxSvg} />
                    <StyledImage
                      height={16}
                      alt="soundcloud"
                      src={soundcloudImg}
                    />
                    <Link
                      href={trackInfo ? trackInfo.permalink_url : "#"}
                      target="_blank"
                      rel="noopener"
                    >
                      Link to song
                    </Link>
                  </Popover>
                </Grid>
                <Grid item>
                  <Volume
                    volume={volume}
                    changeVolume={this.changeVolume}
                    aria-label="volume"
                  />
                </Grid>
              </Grid>
            </div>
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
