import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Tooltip, Button, withStyles } from '@material-ui/core';

export const PageWrapper = styled.div`
  padding-top: 40px;
`;

export const TitleWrapper = styled.div`
  max-width: 600px;
`;

export const BlockWrapper = styled.div`
  padding-top: 20px;
`;

export const StyledTooltip = withStyles({
  tooltip: ({ maxwidth }) => ({
    padding: 0,
    maxWidth: maxwidth,
    margin: 0
  })
})(Tooltip);

export const StyledButton = styled(Button)`
  padding: 0 !important;
`;

export const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 0;
  font-size: 0.8rem;
  border-radius: 5px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.5);
  &:hover {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.75);
  }
  transition: 0.2s linear;
`;
