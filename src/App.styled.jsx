import styled from 'styled-components';
import { Grid, TextField, Typography, Fab } from '@material-ui/core';
import { ArrowDownward } from '@material-ui/icons';

export const StyledMoodGrid = styled(Grid)`
  max-width: 500px;
`;

export const StyledHeaderGrid = styled(Grid)`
  justify-content: space-between;
`;

export const DummyItem = styled(Grid)`
  flex: 1;
  max-width: 150px;
`;

export const MoodTypography = styled(Typography)`
  text-align: center;
  line-height: 1.9 !important;
  font-weight: 600;
  color: lightgray;
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
  display: flex;
  box-sizing: border-box;
  flex-wrap: nowrap !important;
  padding: 0px 16px;
  ${({ pageid }) => `
    overflow-y: auto;
    background:linear-gradient(
      ${pageid * 180}deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(40, 40, 255, ${pageid ? 0.02 : 0}) 5%,
      rgba(40, 40, 255, ${pageid ? 0.02 : 0}) 100%);
  `}
  transition: 0.5s ease-in-out;
  ${({ position }) => `transform: translateY(${Number(position) * 100}%)`}
`;

export const ArrowIconButton = styled(Fab)`
  top: ${({ pageheight }) => pageheight - 63}px;
  right: 6px;
  position: fixed !important;
`;

export const StyledArrowDownward = styled(ArrowDownward)`
  transition: 0.5s cubic-bezier(0.42, 0.01, 0.58, 1.45) transform !important;
  ${({ rotate }) => `transform: rotate(${rotate * 0.5}turn)`}
`;

export const BottomSection = styled(Grid)`
  display: flex;
  align-self: start;
  align-items: center;
`;

export const StyledImage = styled.img`
  height: ${({ height }) => height}px;
`;
