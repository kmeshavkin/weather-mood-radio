import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Tooltip, Button, withStyles, TableCell, Paper, Grid } from '@material-ui/core';

export const PageWrapper = styled(Grid)`
  padding-top: 40px;
  max-width: 800px;
  div + div {
    padding-top: 20px;
  }
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

export const TableGrid = styled(Grid)`
  overflow-x: auto;
  flex: 1;
`;

export const TablePaper = styled(Paper)`
  min-width: 450px;
`;

export const StyledCell = styled(TableCell)`
  padding: 4px !important;
`;

export const TableHeadCell = styled(StyledCell)`
  padding-left: 12px !important;
  font-weight: bold !important;
`;
