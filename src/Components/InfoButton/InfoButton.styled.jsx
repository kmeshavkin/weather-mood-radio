import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const StyledGrid = styled(Grid)`
  padding: 6px;
`;

export const StyledImage = styled.img`
  height: ${({ height }) => height}px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
