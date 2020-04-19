import React from 'react';
import { IconButton, Popover, Typography, Link, Grid } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { StyledGrid, StyledImage } from './InfoButton.styled';
import { trackInfoType, playAllowedType } from '../../utils/sharedPropTypes';

import soundcloudImg from '../../resources/soundcloud.png';

class InfoButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  render() {
    const { anchorEl } = this.state;
    const { trackInfo, playAllowed } = this.props;
    return (
      <>
        <IconButton
          onClick={(event) => this.setState({ anchorEl: event.currentTarget })}
          aria-label="info"
          size="small"
        >
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
              {playAllowed ? (
                <>
                  <Typography>Visit song page (soundcloud):</Typography>
                  <Link href={trackInfo ? trackInfo.permalink_url : '#'} target="_blank" rel="noopener">
                    <StyledImage height={16} alt="soundcloud" src={soundcloudImg} />
                  </Link>
                </>
              ) : (
                  ''
                )}
              <Typography variant="body2">Made by Konstantin Meshavkin, visit my github:</Typography>
              <Link href="https://github.com/kmeshavkin" target="_blank" rel="noopener">
                <Typography variant="body2">https://github.com/kmeshavkin</Typography>
              </Link>
            </Grid>
          </StyledGrid>
        </Popover>
      </>
    );
  }
}

export default InfoButton;

InfoButton.defaultProps = {
  trackInfo: undefined,
};

InfoButton.propTypes = {
  trackInfo: trackInfoType,
  playAllowed: playAllowedType.isRequired,
};
