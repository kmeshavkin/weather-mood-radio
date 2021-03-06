import styled from 'styled-components';
import { Card, CardMedia, Typography, Grid, CardContent } from '@material-ui/core';

export const StyledCard = styled(Card)`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledOuterGrid = styled(Grid)`
  height: 100%;
  padding: 12px 6px 8px 12px;
`;

export const StyledGrid = styled(Grid)`
  height: 100%;
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

export const StyledCardContent = styled(CardContent)`
  padding: 0px !important;
`;

export const PlayerWrapper = styled.div`
  padding-right: 6px;
  padding-bottom: 3px;
`;

export const StyledTitleGrid = styled(Grid)`
  width: 250px;
  height: 60px;
  position relative;
  margin-bottom: 6px;

  ${({ applygradient }) =>
    applygradient === 'true' &&
    `
    overflow: hidden;
    &:after {
    content:'';
    width:100%;
    height:100%;    
    position:absolute;
    left:0;
    top:0;
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%);
  `}
  
}
`;

export const VolumeGrid = styled(Grid)`
  flex: 1;
`;

export const StyledTypography = styled(Typography)`
  position: absolute;
  white-space: nowrap;
  
  ${({ top }) => (top ? 'top' : 'bottom')}: 0;


  ${({ width }) => {
    const slideTime = (width - 250) * 0.2;
    return !width || width < 250
      ? `
        width: 250px;
      `
      : `
        animation: slide infinite linear ${slideTime}s;
        @keyframes slide {
          0%, ${10 * (15 / slideTime)}%, 100% { transform: translate(10px); }
          50%, ${50 + 10 * (15 / slideTime)}% { transform: translate(-${width - 240}px); }
        }
      `;
  }}
  }
`;
