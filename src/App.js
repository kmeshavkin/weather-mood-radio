import React from 'react';
import './App.css';
import Player from './Components/Player/Player';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      playbackStarted: false
    };
  }

  render() {
    const { playbackStarted } = this.state;
    return (
      <>
        {playbackStarted ? (
          ''
        ) : (
          <button onClick={() => this.setState({ playbackStarted: true })}>Start Playback!</button>
        )}
        <Player key={playbackStarted} playbackStarted={playbackStarted} />
      </>
    );
  }
}

export default App;
