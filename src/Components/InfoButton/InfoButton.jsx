import React from 'react';
import { IconButton, Popover, Typography, Link, Grid } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import reactSvg from '../../resources/react.svg';
import reduxSvg from '../../resources/redux.svg';
import soundcloudImg from '../../resources/soundcloud.png';
import { StyledImage, StyledGrid } from './InfoButton.styled';

class InfoButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  render() {
    const { anchorEl } = this.state;
    const { trackInfo } = this.props;
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
          <StyledGrid container direction="column">
            <Grid item>
              <Typography>Powered by:</Typography>
            </Grid>
            <Grid item>
              <StyledImage height={30} alt="react" src={reactSvg} />
              <StyledImage height={30} alt="redux" src={reduxSvg} />
            </Grid>
            <Grid item>
              <StyledImage height={16} alt="soundcloud" src={soundcloudImg} />
            </Grid>
            <br />
            <Grid item>
              <Link href={trackInfo ? trackInfo.permalink_url : '#'} target="_blank" rel="noopener">
                <Typography>Go to soundcloud</Typography>
              </Link>
            </Grid>
          </StyledGrid>
        </Popover>
      </>
    );
  }
}

export default InfoButton;
