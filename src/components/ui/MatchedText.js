import React from 'react';
import {Text} from 'rebass';
import {colors} from 'styles';

export default ({matchString, text, onClick}) => {
  const split = text.split(new RegExp(matchString, 'gi'));
  const matched = text.match(new RegExp(matchString, 'gi'));
  if (!matchString || split.length === 1) {
    return <Text onClick={onClick}>{text}</Text>;
  }
  let tokens = [];
  split.forEach((value, i) => {
    tokens.push({
      value,
      matched: false,
    });
    if (matched[i]) {
      tokens.push({
        value: matched[i],
        matched: true,
      });
    }
  });
  return (
    <Text onClick={onClick}>
      {tokens.map(({matched, value}, i) => (
        <span
          style={{
            color: matched ? colors.hover : colors.primary,
            fontWeight: matched ? 'bold' : undefined,
          }}
          key={i}>
          {value}
        </span>
      ))}
    </Text>
  );
};
