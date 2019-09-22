const initialState = {
  playHistory: [],
  currentTrackIndex: 0,
  track: undefined,
  trackInfo: undefined,
  playAllowed: false,
  weather: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TRACK':
      return {
        ...state,
        playHistory: action.history,
        currentTrackIndex: action.trackIndex,
        playAllowed: false
      };
    case 'NEW_TRACK':
      return {
        ...state,
        track: action.track,
        trackInfo: action.trackInfo,
        playAllowed: true
      };
    default:
      return state;
  }
};
