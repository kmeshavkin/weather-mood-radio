import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import soundcloud from 'soundcloud';
import { Grid } from '@material-ui/core';
import faker from 'faker';
import { newTrack as newTrackAction, changeTrack as changeTrackAction } from '../../store/actions';
import { DEFAULT_VOLUME, GENRES, PAGE_SIZE } from '../../utils/constants';
import { getRandom, getTextWidth } from '../../utils/functions';
import { CLIENT_ID } from '../../privateKeys';
import PlayControls from '../PlayControls/PlayControls';
import Volume from '../Volume/Volume';
import {
  StyledCard,
  StyledCardMedia,
  StyledTypography,
  StyledTitleGrid,
  PlayerWrapper,
  StyledCardContent,
  StyledGrid,
  VolumeGrid,
  StyledOuterGrid,
} from './Player.styled';
import recordSvg from '../../resources/record.svg';
import InfoButton from '../InfoButton/InfoButton';
import {
  trackType,
  trackInfoType,
  playHistoryType,
  currentTrackIndexType,
  newTrackType,
  changeTrackType,
  playAllowedType,
} from '../../utils/sharedPropTypes';
import CustomSnackbar from '../Snackbar/Snackbar';

/* Create dummy items when error occured */
const dummyTrack = (nextTrack) => {
  const randomLength = Math.random() * 100000 + 100000;
  let currentTime = 0;
  let isPlaying = true;

  return {
    isPlaying: () => isPlaying,
    getDuration: () => randomLength,
    currentTime: () => {
      if (currentTime + 500 >= randomLength) nextTrack();
      else currentTime += 500;
      return currentTime;
    },
    setVolume: () => { },
    seek: (time) => {
      currentTime = time;
    },
    play: () => {
      isPlaying = true;
    },
    pause: () => {
      isPlaying = false;
    },
  };
};

const dummyTrackInfo = () => {
  return {
    id: Math.floor(Math.random() * 100000),
    title: faker.lorem.words(),
    user: {
      username: faker.internet.userName(),
    },
    artwork_url: faker.image.imageUrl(200, 200, 'abstract', true),
    permalink_url: '#',
  };
};
/* --- */

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      volume: DEFAULT_VOLUME,
      playbackStarted: false,
      isSnackbarOpen: false,
      retries: 0,
    };
  }

  setMediaSession = (track, trackInfo) => {
    if ('mediaSession' in navigator) {
      // , type: 'image/png'
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: trackInfo.title,
        artist: trackInfo.user.username,
        // artwork: [
        //   { src: trackInfo.artwork_url, sizes: '96x96', type: 'image/jpg' },
        //   { src: trackInfo.artwork_url, sizes: '128x128', type: 'image/jpg' },
        //   { src: trackInfo.artwork_url, sizes: '192x192', type: 'image/jpg' },
        //   { src: trackInfo.artwork_url, sizes: '256x256', type: 'image/jpg' },
        //   { src: trackInfo.artwork_url, sizes: '384x384', type: 'image/jpg' },
        //   { src: trackInfo.artwork_url, sizes: '512x512', type: 'image/jpg' }
        // ]
      });

      navigator.mediaSession.setActionHandler('play', this.onPlayPause);
      navigator.mediaSession.setActionHandler('pause', this.onPlayPause);
      navigator.mediaSession.setActionHandler('previoustrack', this.prevTrack);
      navigator.mediaSession.setActionHandler('nexttrack', this.nextTrack);
    }
  };

  startPlayback = () => {
    soundcloud.initialize({
      client_id: CLIENT_ID,
    });
    this.playSong();
    this.setState({ playbackStarted: true });
  };

  getTrackInfo = (query) => {
    const { playHistory, trackInfo } = this.props;
    return soundcloud
      .get('/tracks', {
        q: query,
        genres: GENRES,
        limit: PAGE_SIZE,
      })
      .then((trackList) =>
        getRandom(trackList.filter((x) => !playHistory.includes(x.id) && (!trackInfo || x.id !== trackInfo.id)))
      );
  };

  getTrack = async (searchTerm, trackId) => {
    const { season } = this.props;
    try {
      if (trackId) {
        return soundcloud.get('/tracks', { ids: trackId }).then((track) => track[0]);
      }
      const query = searchTerm || 'lo-fi';
      console.log('query: ', query);
      const trackInfo = (await this.getTrackInfo(query)) || (await this.getTrackInfo(season));
      return trackInfo;
    } catch (e) {
      return new Promise(() => Promise.reject(e));
    }
  };

  onPlayPause = () => {
    const { track } = this.props;
    const { playbackStarted } = this.state;
    if (!playbackStarted) this.startPlayback();
    else if (track.isPlaying()) track.pause();
    else track.play();
    this.forceUpdate();
  };

  playSong = async (trackId) => {
    const { volume, retries } = this.state;
    const { newTrack, mood } = this.props;
    try {
      const trackInfo = await this.getTrack(mood, trackId);
      const track = await soundcloud.stream(`/tracks/${trackInfo.id}`);
      track.on('finish', () => this.nextTrack());
      console.log('trackInfo: ', trackInfo);
      await track.play();
      track.setVolume(volume);
      newTrack(track, trackInfo);
      this.setMediaSession(track, trackInfo);
      console.log('Playback started!');
    } catch (e) {
      if (retries < 3) {
        console.warn(`Retrying song: ${retries + 1}`);
        setTimeout(() => this.setState({ retries: retries + 1 }, () => this.playSong(trackId)), 3000);
      } else {
        console.error('Error occurred.', e);
        this.setState({ isSnackbarOpen: true });

        const newDummyTrack = dummyTrack(this.nextTrack);
        setTimeout(() => newTrack(newDummyTrack, dummyTrackInfo()), 1000);
      }
    }
    this.setState({ retries: 0 });
  };

  prevTrack = () => {
    const {
      playHistory: [...playHistory],
      currentTrackIndex,
      trackInfo,
      changeTrack,
    } = this.props;
    if (currentTrackIndex > 0) {
      this.playSong(playHistory[currentTrackIndex - 1]);
      if (currentTrackIndex === playHistory.length) playHistory.push(trackInfo.id);
      changeTrack(playHistory, currentTrackIndex - 1);
    }
  };

  nextTrack = () => {
    const {
      playHistory: [...playHistory],
      currentTrackIndex,
      trackInfo,
      changeTrack,
    } = this.props;
    if (currentTrackIndex < playHistory.length) {
      this.playSong(playHistory[currentTrackIndex + 1]);
    } else {
      playHistory.push(trackInfo.id);
      this.playSong();
    }
    changeTrack(playHistory, currentTrackIndex + 1);
  };

  changeVolume = (volume) => {
    const { track } = this.props;
    if (track) track.setVolume(volume);
    this.setState({ volume });
  };

  render() {
    const { volume, playbackStarted, isSnackbarOpen } = this.state;
    const { track, trackInfo, playAllowed } = this.props;
    const isBGAvailable = trackInfo && trackInfo.artwork_url;
    const titleWidth = getTextWidth(trackInfo ? trackInfo.title : 0, '1.5rem');
    const usernameWidth = getTextWidth(trackInfo ? trackInfo.user.username : 0, '1rem');
    return (
      <>
        <StyledCard>
          <StyledCardMedia
            stretch={isBGAvailable}
            image={isBGAvailable ? trackInfo.artwork_url : recordSvg}
            title="Cover image"
          />
          <StyledCardContent>
            <StyledOuterGrid container justify="center" direction="row" alignItems="center" wrap="nowrap">
              <PlayerWrapper>
                <Grid container item direction="column" alignItems="center">
                  <StyledTitleGrid item applygradient={(titleWidth > 250 || usernameWidth > 250).toString()}>
                    <StyledTypography top="true" width={titleWidth} align="center" component="h5" variant="h5">
                      {trackInfo ? trackInfo.title : ''}
                    </StyledTypography>
                    <StyledTypography width={usernameWidth} align="center" variant="subtitle1" color="textSecondary">
                      {trackInfo ? trackInfo.user.username : ''}
                    </StyledTypography>
                  </StyledTitleGrid>
                  <PlayControls
                    startPlayback={this.startPlayback}
                    playbackStarted={playbackStarted}
                    nextTrack={this.nextTrack}
                    prevTrack={this.prevTrack}
                    onPlayPause={this.onPlayPause}
                    isPlaying={track ? track.isPlaying() : false}
                  />
                </Grid>
              </PlayerWrapper>
              <StyledGrid container item direction="column" justify="center">
                <Grid item>
                  <InfoButton playAllowed={playAllowed} trackInfo={trackInfo} />
                </Grid>
                <VolumeGrid item>
                  <Volume volume={volume} changeVolume={this.changeVolume} aria-label="volume" />
                </VolumeGrid>
              </StyledGrid>
            </StyledOuterGrid>
          </StyledCardContent>
        </StyledCard>
        <CustomSnackbar
          open={isSnackbarOpen}
          onClose={() => this.setState({ isSnackbarOpen: false })}
          message="Error occurred. This likely happened because soundcloud API has reached maximum requests for this key for month. Player will still operate, but with dummy data (to be able to showcase most of the features, except playing dynamic mood music)."
          variant="error"
          duration={20000}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  track: state.track,
  trackInfo: state.trackInfo,
  playHistory: state.playHistory,
  currentTrackIndex: state.currentTrackIndex,
  playAllowed: state.playAllowed,
});

const mapDispatchToProps = (dispatch) => ({
  newTrack: (history, trackIndex) => dispatch(newTrackAction(history, trackIndex)),
  changeTrack: (track, trackInfo) => dispatch(changeTrackAction(track, trackInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);

Player.defaultProps = {
  trackInfo: undefined,
  track: undefined,
  playHistory: [],
  currentTrackIndex: 0,
  mood: undefined,
  season: undefined,
};

Player.propTypes = {
  // If song playback should be started or not (used for initial start)
  newTrack: newTrackType.isRequired,
  changeTrack: changeTrackType.isRequired,
  playHistory: playHistoryType,
  currentTrackIndex: currentTrackIndexType,
  trackInfo: trackInfoType,
  track: trackType,
  playAllowed: playAllowedType.isRequired,
  // Current mood, set in App.js
  mood: PropTypes.string,
  // Current season for soundcloud query, used in case mood request failed
  season: PropTypes.string,
};
