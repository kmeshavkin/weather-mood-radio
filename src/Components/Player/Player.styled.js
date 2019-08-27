import styled from 'styled-components';
import { Card, CardMedia, Typography, Grid } from '@material-ui/core';

export const StyledCard = styled(Card)`
  display: flex;
  width: fit-content;
  margin: 0 auto;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 150px;
`;

export const StyledTitleGrid = styled(Grid)`
  width: 250px;
  overflow: hidden;
`;

export const StyledImage = styled.img`
  height: ${({ height }) => height}px;
`;

export const StyledTypography = styled(Typography)`
  white-space: nowrap;

  animation: slide 7.5s linear infinite;

  @keyframes slide {
    0% {
      transform: translate(0em);
    }
    50% {
      transform: translate(0em);
    }
    100% {
      transform: translate(0em);
    }
  }
`;
