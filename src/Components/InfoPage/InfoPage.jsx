import React from 'react';
import { Typography, Link, Table, TableHead, TableRow, TableBody, Grid } from '@material-ui/core';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  PageWrapper,
  StyledSyntaxHighlighter,
  StyledTooltip,
  StyledButton,
  TableHeadCell,
  StyledCell,
  TablePaper,
  TableGrid
} from './InfoPage.styled';
import useWindowDimensions from '../../utils/functions';
import { MOOD_MATRIX } from '../../utils/constants';

const seasonStr = `
/**
 * Takes latitude and current month and returns season
 * @param {number} latitude Current latitude
 * @returns {String} Current season
 */
export function getSeason(latitude) {
  const shiftSeasons = latitude < 0;
  // % 12 shifts December to index 0, so 0-2 is first season, 3-5 is second and so on
  const seasonNumber = (new Date().getMonth() + 1 + (shiftSeasons ? 6 : 0)) % 12;
  if (seasonNumber < 3) return SEASONS.winter;
  if (seasonNumber < 6) return SEASONS.spring;
  if (seasonNumber < 9) return SEASONS.summer;
  return SEASONS.autumn;
}
`;

const dayTimeStr = `
/**
 * Takes sunriseTime and sunsetTime and returns current day time
 * @param {number} sunriseTime Sunrise time in ms
 * @param {number} sunsetTime Sunset time in ms
 * @returns {String} Current day time
 */
export function getDayTime(sunriseTime, sunsetTime) {
  const currentDate = new Date().getTime();
  if (currentDate - (sunriseTime - hourInMS) < 0) return DAY_TIME.night;
  if (currentDate - (sunriseTime + hourInMS * 3) < 0) return DAY_TIME.morning;
  if (currentDate - (sunsetTime - hourInMS * 3) < 0) return DAY_TIME.day;
  if (currentDate - (sunsetTime + hourInMS) < 0) return DAY_TIME.evening;
  return DAY_TIME.night;
}
`;

const HoverComponent = str => {
  const { width } = useWindowDimensions();
  return (
    <StyledTooltip
      disableFocusListener
      maxwidth={width - 40}
      enterTouchDelay={300}
      leaveTouchDelay={6000}
      title={
        <StyledSyntaxHighlighter language="javascript" style={vs2015}>
          {str}
        </StyledSyntaxHighlighter>
      }
      interactive
    >
      <StyledButton color="secondary">hover for code</StyledButton>
    </StyledTooltip>
  );
};

const InfoPage = () => {
  return (
    <PageWrapper container>
      <Grid item>
        <Typography variant="h4">Weather Mood Radio</Typography>
        <Typography variant="button">
          <ul>
            <li>Music Radio made from scratch (APIs + UI kit)</li>
            <li>Javascript + React + Redux</li>
            <li>Material-UI</li>
            <li>API (soundcloud, darksky.net)</li>
            <li>Responsive design</li>
          </ul>
        </Typography>
        <Typography variant="body2">
          Radio that picks Lo-Fi tracks from{' '}
          <Link href="https://soundcloud.com/" target="_blank" rel="noopener">
            SoundCloud
          </Link>{' '}
          based on current weather, day time and season at your location.
        </Typography>
        <Typography variant="body2">
          Please allow this app to get your geolocation, it will automatically detect appropriate mood for current
          weather, day time and season. Otherwise you can switch to Custom Mood mode to pick appropriate parameters
          instead.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          If app will be able to get your geolocation, it will use{' '}
          <Link href="https://darksky.net/poweredby/" target="_blank" rel="noopener">
            DarkSky
          </Link>{' '}
          API to get weather in your region, as well as sunrise and sunset time. Then it will select season based on
          your latitude ({HoverComponent(seasonStr)}) and approximate day time based on sunrise and sunset time (
          {HoverComponent(dayTimeStr)}).
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          In the table below you can see Mood Matrix, which determines Mood (what query will be sent to Soundcloud)
          based on Weather, Day time and Season parameters. First, cell is picked according to current Weather and Day
          time, then word &quot;SEASON&quot; (if it&apos;s in this cell) replaced with current Season and some of
          weather parameters randomly replaced with synonyms (to increase songs pool).
        </Typography>
      </Grid>
      <TableGrid item>
        <TablePaper>
          <Table size="small">
            <TableHead>
              <TableRow>
                {/* Get keys from first element of Matrix and add empty cell to start */}
                {[''].concat(Object.keys(Object.values(MOOD_MATRIX)[0])).map(col => (
                  <StyledCell key={col}>{col}</StyledCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(MOOD_MATRIX).map(([key, row]) => (
                <TableRow key={key}>
                  <TableHeadCell key={key}>{key}</TableHeadCell>
                  {Object.entries(row).map(([cellKey, cell]) => (
                    <StyledCell key={key + cellKey}>{cell}</StyledCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TablePaper>
      </TableGrid>
    </PageWrapper>
  );
};

export default InfoPage;
