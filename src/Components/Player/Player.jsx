import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import soundcloud from 'soundcloud';
import { CardContent, Grid } from '@material-ui/core';
import { newTrack as newTrackAction, changeTrack as changeTrackAction } from '../../store/actions';
import { DEFAULT_VOLUME, GENRES, PAGE_SIZE } from '../../utils/constants';
import { getRandom, getTextWidth } from '../../utils/functions';
import { CLIENT_ID } from '../../privateKeys';
import PlayControls from '../PlayControls/PlayControls';
import Volume from '../Volume/Volume';
import { StyledCard, StyledCardMedia, StyledTypography, StyledTitleGrid, PlayerWrapper } from './Player.styled';
import recordSvg from '../../resources/record.svg';
import InfoButton from '../InfoButton/InfoButton';
import {
  trackType,
  trackInfoType,
  playHistoryType,
  currentTrackIndexType,
  newTrackType,
  changeTrackType,
  playAllowedType
} from '../../utils/sharedPropTypes';

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      volume: DEFAULT_VOLUME
    };
  }

  startPlayback = () => {
    soundcloud.initialize({
      client_id: CLIENT_ID
    });
    this.playSong();

    // -Test stuff- //
    window.playSong = this.playSong;
    window.soundcloud = soundcloud;
    // --- //
  };

  getTrack = (searchTerm, trackId) => {
    try {
      if (trackId) {
        return soundcloud.get('/tracks', { ids: trackId }).then(track => track[0]);
      }
      const query = searchTerm || 'lo-fi';
      console.log('query: ', query);
      return soundcloud
        .get('/tracks', {
          q: query,
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
    const { newTrack, mood } = this.props;
    try {
      const trackInfo = await this.getTrack(mood, trackId);
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
      trackInfo,
      changeTrack
    } = this.props;
    if (currentTrackIndex > 0) {
      this.playSong(playHistory[currentTrackIndex - 1]);
      if (currentTrackIndex === playHistory.length) playHistory.push(trackInfo.id);
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
    const { trackInfo, playAllowed } = this.props;
    const isBGAvailable = trackInfo && trackInfo.artwork_url;
    const titleWidth = getTextWidth(trackInfo ? trackInfo.title : 0, '1.5rem');
    const usernameWidth = getTextWidth(trackInfo ? trackInfo.user.username : 0, '1rem');
    return (
      <StyledCard>
        <StyledCardMedia
          stretch={isBGAvailable}
          image={isBGAvailable ? trackInfo.artwork_url : recordSvg}
          title="Cover image"
        />
        <CardContent style={{ paddingBottom: '16px' }}>
          <Grid container justify="center" direction="row" alignItems="center" wrap="nowrap" spacing={2}>
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
                  nextTrack={this.nextTrack}
                  prevTrack={this.prevTrack}
                />
              </Grid>
            </PlayerWrapper>
            <div>
              <Grid container item direction="column" justify="center">
                <Grid item>
                  <InfoButton playAllowed={playAllowed} trackInfo={trackInfo} />
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
  currentTrackIndex: state.currentTrackIndex,
  playAllowed: state.playAllowed
});

const mapDispatchToProps = dispatch => ({
  newTrack: (history, trackIndex) => dispatch(newTrackAction(history, trackIndex)),
  changeTrack: (track, trackInfo) => dispatch(changeTrackAction(track, trackInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);

Player.defaultProps = {
  trackInfo: undefined,
  track: undefined,
  playHistory: [],
  currentTrackIndex: 0,
  mood: undefined
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
  mood: PropTypes.string
};
