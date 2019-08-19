import CLIENT_ID from '../../../privateKeys';
import React from 'react';
import soundcloud from 'soundcloud';

class Player extends React.PureComponent {
  constructor() {
    super();
    soundcloud.initialize({
      client_id: CLIENT_ID,
    });
    this.playSong();
  }

  async playSong() {
    try {
      const player = await soundcloud.stream('/tracks/417135627/');
      await player.play();
      console.log('Playback started!');
    } catch (e) {
      console.error('Playback rejected. Try calling play() from a user interaction.', e);
    }
  }

  render() {
    // https://developers.soundcloud.com/docs/api/sdks#javascript
    // https://developers.soundcloud.com/docs/api/guide#playing
    console.log('soundcloud: ', soundcloud);
    return (
      <div>
        Player here
      </div>
    );
  }
}

export default Player;
