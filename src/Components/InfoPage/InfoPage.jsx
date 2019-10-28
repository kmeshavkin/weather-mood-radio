import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  PageWrapper,
  TitleWrapper,
  BlockWrapper,
  StyledSyntaxHighlighter,
  StyledTooltip,
  StyledButton
} from './InfoPage.styled';
import useWindowDimensions from '../../utils/functions';

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
  const sunriseDate = sunriseTime;
  const sunsetDate = sunsetTime;
  if (currentDate - (sunriseDate - hourInMS) < 0) return DAY_TIME.night;
  if (currentDate - (sunriseDate + hourInMS * 3) < 0) return DAY_TIME.morning;
  if (currentDate - (sunsetDate - hourInMS * 3) < 0) return DAY_TIME.day;
  if (currentDate - (sunsetDate + hourInMS) < 0) return DAY_TIME.evening;
  return DAY_TIME.night;
}
`;

const HoverComponent = str => {
  const { width } = useWindowDimensions();
  return (
    <StyledTooltip
      disableFocusListener
      maxwidth={width - 40}
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
    <PageWrapper>
      <TitleWrapper>
        <Typography variant="h4">Weather Mood Radio</Typography>
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
      </TitleWrapper>
      <BlockWrapper>
        <Typography>
          If app will be able to get your geolocation, it will use{' '}
          <Link href="https://darksky.net/poweredby/" target="_blank" rel="noopener">
            DarkSky
          </Link>{' '}
          API to get weather in your region, as well as sunrise and sunset time. Then it will select season based on
          your latitude ({HoverComponent(seasonStr)}) and approximate day time based on sunrise and sunset time (
          {HoverComponent(dayTimeStr)}).
        </Typography>
      </BlockWrapper>
      {/* <StyledSyntaxHighlighter language="javascript" style={vs2015}>
            {getDayTime}
          </StyledSyntaxHighlighter> */}
      <BlockWrapper>
        <Typography>Weather, Season & Day Time list + genre list</Typography>
        <Typography>Synonyms list?</Typography>
        <Typography>Mood Matrix</Typography>
        <Typography>Some code?</Typography>
        <Typography>Project highlights?</Typography>
      </BlockWrapper>
    </PageWrapper>
  );
};

export default InfoPage;
