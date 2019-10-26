import React from 'react';
import { connect } from 'react-redux';
import { Slider, Grid } from '@material-ui/core';
import { REWIND_SLIDER_MAX } from '../../utils/constants';
import { StyledGrid, StyledTypography } from './PlaySlider.styled';
import { formatNumber } from '../../utils/functions';
import { trackType } from '../../utils/sharedPropTypes';

class PlaySlider extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      sliderPosition: 0,
      holding: false,
      updateSlider: null
    };
  }

  componentDidMount() {
    const updateSlider = setInterval(() => {
      const { holding } = this.state;
      const { track } = this.props;
      if (track && track.isPlaying() && !holding) {
        this.setState({
          sliderPosition: (track.currentTime() / track.getDuration()) * REWIND_SLIDER_MAX,
          currentTime: Math.ceil(track.currentTime() / 1000)
        });
      }
    }, 1000);
    this.setState({ updateSlider });
  }

  componentWillUnmount() {
    const { updateSlider } = this.state;
    clearInterval(updateSlider);
  }

  rewind = (e, value) => {
    const { track } = this.props;
    this.setState({
      sliderPosition: value,
      currentTime: track ? Math.round(((value / REWIND_SLIDER_MAX) * track.getDuration()) / 1000) : 0
    });
  };

  render() {
    const { currentTime, sliderPosition } = this.state;
    const { track } = this.props;
    return (
      <Grid container item direction="row" alignItems="center" spacing={1}>
        <StyledGrid item>
          <StyledTypography variant="caption">{formatNumber(currentTime)}</StyledTypography>
        </StyledGrid>
        <StyledGrid item xs>
          <Slider
            value={sliderPosition}
            max={REWIND_SLIDER_MAX}
            onMouseDown={() => this.setState({ holding: true })}
            onMouseUp={() => this.setState({ holding: false })}
            onChange={this.rewind}
            onChangeCommitted={(e, value) => track && track.seek((value / REWIND_SLIDER_MAX) * track.getDuration())}
          />
        </StyledGrid>
        <StyledGrid item>
          <StyledTypography variant="caption">
            {formatNumber(track ? Math.ceil(track.getDuration() / 1000) : 0)}
          </StyledTypography>
        </StyledGrid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  track: state.track
});

export default connect(mapStateToProps)(PlaySlider);

PlaySlider.defaultProps = {
  track: undefined
};

PlaySlider.propTypes = {
  track: trackType
};
