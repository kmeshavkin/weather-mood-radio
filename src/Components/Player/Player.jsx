import React from "react";
import soundcloud from "soundcloud";
import Grid from "@material-ui/core/Grid";
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

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      playHistory: [],
      currentTrackIndex: 0,
      track: undefined,
      trackInfo: undefined,
      playAllowed: false,
      playing: true,
      volume: DEFAULT_VOLUME
    };

    soundcloud.initialize({
      client_id: CLIENT_ID
    });
    this.playSong();

    // -Test stuff- //
    // this.test().then((tracks) => console.log(tracks));
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
    try {
      const trackInfo = await this.getTrack("rainy", trackId);
      console.log("trackInfo: ", trackInfo);
      const track = await soundcloud.stream(`/tracks/${trackInfo.id}`);
      await track.play();
      track.setVolume(volume / 100);
      this.setState({ track, trackInfo, playAllowed: true });
      console.log("Playback started!");
    } catch (e) {
      console.error("Playback rejected.", e);
      this.playSong();
    }
  };

  // test = () => {
  //   try {
  //     return soundcloud.get('/tracks', {
  //       q: 'Rain',
  //       genres: 'lofi',
  //       limit: 100,
  //       offset: 0,
  //     });
  //   } catch (e) {
  //     return new Promise(() => Promise.reject(e));
  //   }
  // }

  onPlayPause = () => {
    const { track, playing } = this.state;
    if (playing) track.pause();
    else track.play();
    this.setState({ playing: !playing });
  };

  changeVolume = volume => {
    const { track } = this.state;
    if (track) track.setVolume(volume / 100);
    this.setState({ volume });
  };

  prevTrack = () => {
    const {
      playHistory: [...playHistory]
    } = this.state;
    let { currentTrackIndex } = this.state;

    let playAllowed = true;
    if (currentTrackIndex > 0) {
      currentTrackIndex--;
      this.playSong(playHistory[currentTrackIndex]);
      playAllowed = false;
    }

    this.setState({
      currentTrackIndex,
      playAllowed
    });
    console.log("Previous Track", playHistory, currentTrackIndex);
  };

  nextTrack = () => {
    const {
      playHistory: [...playHistory],
      trackInfo
    } = this.state;
    let { currentTrackIndex } = this.state;

    let playAllowed = true;
    currentTrackIndex++;
    if (currentTrackIndex - 1 < playHistory.length) {
      this.playSong(playHistory[currentTrackIndex]);
      playAllowed = false;
    } else {
      playHistory.push(trackInfo.id);
      this.playSong();
    }

    this.setState({
      playHistory,
      currentTrackIndex,
      playAllowed
    });
    console.log("Next Track", playHistory, currentTrackIndex);
  };

  render() {
    // https://developers.soundcloud.com/docs/api/sdks#javascript
    // https://developers.soundcloud.com/docs/api/guide#playing
    const { playAllowed, playing, volume } = this.state;

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
              <Grid item>TrackName</Grid>
              <Grid item>Author</Grid>
              <Grid item>
                <PlayControls
                  playAllowed={playAllowed}
                  playing={playing}
                  onPlayPause={this.onPlayPause}
                  nextTrack={this.nextTrack}
                  prevTrack={this.prevTrack}
                />
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

export default Player;
