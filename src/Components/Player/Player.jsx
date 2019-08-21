import React from 'react';
import soundcloud from 'soundcloud';
import Fab from '@material-ui/core/Fab';
import { PlayArrow, Pause } from '@material-ui/icons';
import { CLIENT_ID } from '../../privateKeys';
import { GENRES, PAGE_SIZE, SYNONYMS } from '../../utils/constants';
import { getRandom } from '../../utils/functions';

class Player extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      playHistory: [],
      playingIndex: -1,
      track: undefined,
      trackInfo: undefined,
      playAllowed: false,
      playing: true,
    };

    soundcloud.initialize({
      client_id: CLIENT_ID,
    });
    this.playSong();
    // this.test().then((tracks) => console.log(tracks));
  }

  onPlayPause = () => {
    const { track, playing } = this.state;
    if (playing) track.pause();
    else track.play();
    this.setState({ playing: !playing });
  }

  test = () => {
    try {
      return soundcloud.get('/tracks', {
        q: 'Rain',
        genres: 'lofi',
        limit: 100,
        offset: 0,
      });
    } catch (e) {
      return new Promise(() => Promise.reject(e));
    }
  }

  getTrack = (searchTerm, trackId) => {
    try {
      return soundcloud.get('/tracks', {
        q: getRandom(SYNONYMS[searchTerm]),
        genres: GENRES,
        limit: PAGE_SIZE,
      }).then((trackList) => getRandom(trackList));
    } catch (e) {
      return new Promise(() => Promise.reject(e));
    }
  }

  playSong = async (trackId) => {
    try {
      const trackInfo = await this.getTrack('rainy', trackId);
      console.log('trackInfo: ', trackInfo);
      const track = await soundcloud.stream(`/tracks/${trackInfo.id}`);
      await track.play();
      this.setState({ track, trackInfo, playAllowed: true });
      console.log('track: ', track);
      console.log('Playback started!');
    } catch (e) {
      console.error('Playback rejected.', e);
      this.playSong();
    }
  }

  render() {
    // https://developers.soundcloud.com/docs/api/sdks#javascript
    // https://developers.soundcloud.com/docs/api/guide#playing
    const { playAllowed, playing } = this.state;

    return (
      <>
        <Fab disabled={!playAllowed} aria-label="play">
          {playing
            ? <Pause onClick={this.onPlayPause} fontSize="large" />
            : <PlayArrow onClick={this.onPlayPause} fontSize="large" />}
        </Fab>
      </>
    );
  }
}

export default Player;
