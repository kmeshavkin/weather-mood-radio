import styled from 'styled-components';
import { Grid, TextField, IconButton, Typography } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';

export const StyledMoodGrid = styled(Grid)`
  max-width: 500px;
`;

export const StyledHeaderGrid = styled(Grid)`
  justify-content: space-between;
`;

export const DummyItem = styled(Grid)`
  width: 150px;
`;

export const StyledCheckboxItem = styled(Grid)`
  width: 150px;
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
  flex-wrap: nowrap !important;
  padding: 4px 16px;
  transition: 0.5s ease-in-out;
  ${({ position }) => `transform: translateY(${Number(position) * 100}%)`}
`;

export const ArrowIconButton = styled(IconButton)`
  top: ${({ pageheight }) => pageheight - 54}px;
  right: 6px;
  position: fixed !important;
`;

export const StyledArrowDownward = styled(ArrowDownward)`
  transition: 0.5s cubic-bezier(0.42, 0.01, 0.58, 1.45) transform !important;
  ${({ rotate }) => `transform: rotate(${rotate * 0.5}turn)`}
`;

export const MoodTypography = styled(Typography)`
  text-align: center;
  font-weight: 600;
  color: lightgray;
`;
