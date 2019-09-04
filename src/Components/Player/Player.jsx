import React from 'react';
import { connect } from 'react-redux';
import soundcloud from 'soundcloud';
import { CardContent, Grid } from '@material-ui/core';
import { newTrack as newTrackAction, changeTrack as changeTrackAction } from '../../store/actions';
import { DEFAULT_VOLUME, GENRES, PAGE_SIZE, SYNONYMS } from '../../utils/constants';
import { getRandom } from '../../utils/functions';
import { CLIENT_ID, DARK_SKY_KEY } from '../../privateKeys';
import PlayControls from '../PlayControls/PlayControls';
import Volume from '../Volume/Volume';
import { StyledCard, StyledCardMedia, StyledTypography, StyledTitleGrid } from './Player.styled';
import recordSvg from '../../resources/record.svg';
import InfoButton from '../InfoButton/InfoButton';

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      volume: DEFAULT_VOLUME
    };
  }

  async componentDidMount() {
    const weather = await this.getWeather();
    console.log('weather: ', weather);
    const { playbackStarted } = this.props;
    if (playbackStarted) {
      soundcloud.initialize({
        client_id: CLIENT_ID
      });
      this.playSong();

      // -Test stuff- //
      window.playSong = this.playSong;
      window.soundcloud = soundcloud;
      // --- //
    }
  }

  async getWeather() {
    if (navigator.geolocation) {
      const position = await this.getPosition();
      const weatherPromise = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${position.coords.latitude},${position.coords.longitude}?exclude=hourly,daily,flags`
      );
      const weather = await weatherPromise.json();
      return weather.currently;
    }
    return new Error("Couldn't retrieve weather or user coordinates");
  }

  getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getTrack = (searchTerm, trackId) => {
    try {
      if (trackId) {
        return soundcloud.get('/tracks', { ids: trackId }).then(track => track[0]);
      }
      return soundcloud
        .get('/tracks', {
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
      const trackInfo = await this.getTrack('rainy', trackId);
      const track = await soundcloud.stream(`/tracks/${trackInfo.id}`);
      track.on('finish', () => this.nextTrack());
      // -Test stuff- //
      console.log('trackInfo: ', trackInfo);
      window.track = track;
      // --- //
      await track.play();
      track.setVolume(volume);
      newTrack(track, trackInfo);
      console.log('Playback started!');
    } catch (e) {
      console.error('Playback rejected.', e);
      // this.playSong();
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
    console.log('Previous Track', playHistory, currentTrackIndex - 1);
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
    console.log('Next Track', playHistory, currentTrackIndex + 1);
  };

  changeVolume = volume => {
    const { track } = this.props;
    if (track) track.setVolume(volume);
    this.setState({ volume });
  };

  render() {
    const { volume } = this.state;
    const { trackInfo } = this.props;
    return (
      <StyledCard>
        <StyledCardMedia
          image={trackInfo && trackInfo.artwork_url ? trackInfo.artwork_url : recordSvg}
          title="Cover image"
        />
        <CardContent>
          <Grid container justify="center" direction="row" alignItems="center" spacing={2}>
            <div>
              <Grid container item direction="column" alignItems="center">
                <StyledTitleGrid item>
                  <StyledTypography align="center" component="h5" variant="h5">
                    {trackInfo ? trackInfo.title : ''}
                  </StyledTypography>
                  <StyledTypography align="center" variant="subtitle1" color="textSecondary">
                    {trackInfo ? trackInfo.user.username : ''}
                  </StyledTypography>
                </StyledTitleGrid>
                <PlayControls nextTrack={this.nextTrack} prevTrack={this.prevTrack} />
              </Grid>
            </div>
            <div>
              <Grid container item direction="column" justify="center">
                <Grid item>
                  <InfoButton trackInfo={trackInfo} />
                </Grid>
                <Grid item>
                  <Volume volume={volume} changeVolume={this.changeVolume} aria-label="volume" />
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
  newTrack: (history, trackIndex) => dispatch(newTrackAction(history, trackIndex)),
  changeTrack: (track, trackInfo) => dispatch(changeTrackAction(track, trackInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
