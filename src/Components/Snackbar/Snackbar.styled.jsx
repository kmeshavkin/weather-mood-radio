import styled from 'styled-components';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import { Snackbar } from '@material-ui/core';
import { amber, green, red, blue } from '@material-ui/core/colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

function pickColor(variant) {
  switch (variant) {
    case 'success':
      return green[600];
    case 'error':
      return red[800];
    case 'info':
      return blue[500];
    case 'warning':
      return amber[800];
    default:
      return '';
  }
}

export const getStyledIcon = variant => styled(variantIcon[variant])`
  font-size: 20px !important;
  opacity: 0.9;
  margin-right: 6px;
`;

export const StyledSnackbar = styled(Snackbar)`
  max-width: 500px;
  & > div {
    flex-wrap: nowrap;
    background-color: ${({ variant }) => pickColor(variant)};
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  font-size: 20px;
`;

export const TextWrapper = styled.span`
  display: flex;
  align-items: center;
`;
