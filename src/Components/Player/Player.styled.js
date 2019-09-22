import styled from 'styled-components';
import { Card, CardMedia, Typography, Grid } from '@material-ui/core';

export const StyledCard = styled(Card)`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 12px;
`;

export const StyledCardMedia = styled(CardMedia)`
  width: 150px;
  min-height: 150px;
  ${({ stretch }) =>
    !stretch
      ? `
  height: 150px;
  align-self: center;
  `
      : ''}
`;

export const StyledTitleGrid = styled(Grid)`
  width: 250px;
  height: 60px;
  overflow: hidden;
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
