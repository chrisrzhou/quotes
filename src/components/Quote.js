import {Flex, Text} from 'rebass';
import {selectAuthor, selectTag} from 'redux/actions';

import ClickableText from './ui/ClickableText';
import React from 'react';
import {colors} from 'styles';
import {connect} from 'react-redux';

const Quote = ({quote, onSelectAuthor, onSelectTag}) => {
  const {author, content, id, tags} = quote;
  return (
    <Flex
      alignItems="flex-end"
      css={`
        animation: fadein 2s ease-in-out;
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;

        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        blockquote {
          margin: 0;
          padding-left: 1em;
          border-left: 4px solid ${colors.secondary};
        }
      `}
      flexDirection="column"
      justifyContent="center"
      key={id}
      m="0 auto"
      p={4}
      width={['100%', 800]}>
      <blockquote>
        <Text fontSize={[16, 32]}>{content}</Text>
      </blockquote>
      <ClickableText
        mt={3}
        onClick={() => {
          onSelectAuthor(author);
        }}>
        — {author || 'Unknown'}
      </ClickableText>
      <Flex mt={3}>
        {tags.map(tag => (
          <ClickableText
            key={tag}
            ml={[1, 2]}
            onClick={() => {
              onSelectTag(tag);
            }}>
            #{tag}
          </ClickableText>
        ))}
      </Flex>
    </Flex>
  );
};

export default connect(
  null,
  {
    onSelectAuthor: selectAuthor,
    onSelectTag: selectTag,
  },
)(Quote);
