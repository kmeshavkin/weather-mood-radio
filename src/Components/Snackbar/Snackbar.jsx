import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import { getStyledIcon, StyledCloseIcon, TextWrapper, StyledSnackbar } from './Snackbar.styled';

const CustomSnackbar = ({ open, onClose, message, variant, duration }) => {
  const StyledIcon = getStyledIcon(variant);
  return (
    <StyledSnackbar
      variant={variant}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <SnackbarContent
        message={
          <TextWrapper>
            <StyledIcon />
            {message}
          </TextWrapper>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <StyledCloseIcon
              style={{
                fontSize: 20
              }}
            />
          </IconButton>
        ]}
      />
    </StyledSnackbar>
  );
};

export default CustomSnackbar;

CustomSnackbar.defaultProps = {
  open: false,
  message: '',
  onClose: undefined,
  duration: 6000
};

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  duration: PropTypes.number
};
