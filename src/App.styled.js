import styled from 'styled-components';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';

export const StyledMoodGrid = styled(Grid)`
  max-width: 500px;
`;

export const StyledCheckboxGrid = styled(Grid)`
  align-self: flex-end;
`;

export const StyledTextField = styled(TextField)`
  width: 218px;
`;

export const PageWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const PageGrid = styled(Grid)`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 4px 16px;
  transition: 0.5s ease-in-out;
  ${({ position }) => `transform: translateY(${Number(position) * 100}%)`}
`;

export const ArrowIconButton = styled(IconButton)`
  top: 94vh;
  right: 6px;
  position: fixed !important;
`;

export const StyledArrowDownward = styled(ArrowDownward)`
  transition: 0.5s cubic-bezier(0.42, 0.01, 0.58, 1.45) transform !important;
  ${({ rotate }) => `transform: rotate(${rotate * 0.5}turn)`}
`;
