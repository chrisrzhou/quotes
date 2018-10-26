import React from 'react';
import twitterSVG from 'assets/twitter.svg';

export default ({quote, author, tags}) => {
  const twitterOrigin = 'https://twitter.com/intent/tweet';
  const greetings = `text="${quote} -@${author || 'Unknown'}"`;
  const hashtags = `hashtags=${tags.join(',')}`;
  const href = `${twitterOrigin}?${greetings}&${hashtags}`;
  return (
    <a href={href} target="_blank">
      <img style={{height: 36, width: 36}} src={twitterSVG} />
    </a>
  );
};
