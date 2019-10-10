import React from 'react';
import { IconButton, Popover, Typography, Link, Grid } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import reactSvg from '../../resources/react.svg';
import reduxSvg from '../../resources/redux.svg';
import soundcloudPoweredImg from '../../resources/soundcloudPowered.png';
import darkSkyPoweredImg from '../../resources/darkSkyPowered.png';
import { StyledImage, StyledGrid } from './InfoButton.styled';
import { trackInfoType, playAllowedType } from '../../utils/sharedPropTypes';

class InfoButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  render() {
    const { anchorEl } = this.state;
    const { trackInfo, playAllowed } = this.props;
    return (
      <>
        <IconButton onClick={event => this.setState({ anchorEl: event.currentTarget })} aria-label="info" size="small">
          <Info fontSize="small" />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => this.setState({ anchorEl: null })}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <StyledGrid container direction="column" justify="center">
            <Grid item>
              <Typography>Powered by:</Typography>
            </Grid>
            <Grid item>
              <StyledImage height={30} alt="react" src={reactSvg} />
              <StyledImage height={30} alt="redux" src={reduxSvg} />
            </Grid>
            <Grid item>
              <Link href="https://soundcloud.com/" target="_blank" rel="noopener">
                <StyledImage height={32} alt="soundcloud" src={soundcloudPoweredImg} />
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://darksky.net/poweredby/" target="_blank" rel="noopener">
                <StyledImage height={48} alt="darksky" src={darkSkyPoweredImg} />
              </Link>
            </Grid>
            <Grid item>
              {playAllowed ? (
                <Link href={trackInfo ? trackInfo.permalink_url : '#'} target="_blank" rel="noopener">
                  <Typography>Visit song page (soundcolud)</Typography>
                </Link>
              ) : (
                ''
              )}
            </Grid>
          </StyledGrid>
        </Popover>
      </>
    );
  }
}

export default InfoButton;

InfoButton.defaultProps = {
  trackInfo: undefined
};

InfoButton.propTypes = {
  trackInfo: trackInfoType,
  playAllowed: playAllowedType.isRequired
};
