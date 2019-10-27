import React from 'react';
import { Typography, Link } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { PageWrapper, TitleWrapper, BodyWrapper, TextBlock, CodeBlock } from './InfoPage.styled';

const getSeason = `
/**
 * Takes latitude and current month and returns season
 * @param {number} latitude Current latitude
 * @returns {String} Current season
 */
export function getSeason(latitude) {
  const seasonIndex = Math.floor(((new Date().getMonth() % 11) + 1) / 3);
  return latitude > 0
    ? ['winter', 'spring', 'summer', 'autumn'][seasonIndex]
    : ['summer', 'autumn', 'winter', 'spring'][seasonIndex];
}
`;

const InfoPage = () => {
  return (
    <PageWrapper>
      <TitleWrapper>
        <Typography variant="h4">Weather Mood Radio</Typography>
        <Typography>
          Radio that picks Lo-Fi tracks from{' '}
          <Link href="https://soundcloud.com/" target="_blank" rel="noopener">
            SoundCloud
          </Link>{' '}
          based on current weather, day time and season at your location.
        </Typography>
        <Typography>
          Please allow this app to get your geolocation, it will automatically detect appropriate mood for current
          weather, day time and season. Otherwise you can switch to Custom Mood mode to pick appropriate parameters
          instead.
        </Typography>
      </TitleWrapper>
      <BodyWrapper>
        <TextBlock>
          <Typography variant="body2">
            If app will be able to get your geolocation, it will use{' '}
            <Link href="https://darksky.net/poweredby/" target="_blank" rel="noopener">
              DarkSky
            </Link>{' '}
            API to get weather in your region, as well as sunrise and sunset time. Then it will select approximate day
            time based on sunrise and sunset time and season based on your latitude.
          </Typography>
          <Typography>Weather, Season & Day Time list + genre list</Typography>
          <Typography>Synonyms list?</Typography>
          <Typography>Mood Matrix</Typography>
          <Typography>Some code?</Typography>
          <Typography>Project highlights?</Typography>
        </TextBlock>
        <CodeBlock>
          {/* <SyntaxHighlighter language="javascript" style={vs2015}>
            {getSeason}
          </SyntaxHighlighter> */}
        </CodeBlock>
      </BodyWrapper>
    </PageWrapper>
  );
};

export default InfoPage;
