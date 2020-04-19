export const changeTrack = (history, trackIndex) => ({
  type: 'CHANGE_TRACK',
  history,
  trackIndex,
});

export const newTrack = (track, trackInfo) => ({
  type: 'NEW_TRACK',
  track,
  trackInfo,
});
