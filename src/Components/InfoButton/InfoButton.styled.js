import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const StyledImage = styled.img`
  height: ${({ height }) => height}px;
`;

export const StyledGrid = styled(Grid)`
  padding: 6px;
`;
