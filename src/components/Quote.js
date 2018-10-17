import React from 'react';

export default ({quote}) => (
  <div>
    <blockquote>{quote.content}</blockquote>
    {quote.author}
    {quote.tags}
  </div>
);
