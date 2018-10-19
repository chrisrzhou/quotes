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
      alignItems="center"
      css={`
        animation: fadein 2s ease-in-out;
        bottom: 0;
        left: 0;
        max-width: 1000px;
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
          border-left: 10px solid ${colors.secondary};
          margin: 48px 0;
          padding-left: 24px;
          @media only screen and (max-device-width: 600px) {
            border-left-width: 4px;
            margin: 24px 0;
            padding-left: 12px;
          }
        }
        blockquote:before {
          color: ${colors.secondary};
          content: open-quote;
          font-size: 10em;
          line-height: 0.1em;
          vertical-align: -0.4em;
          @media only screen and (max-device-width: 600px) {
            font-size: 3em;
          }
        }
        blockquote p {
          display: inline;
        }
      `}
      flexDirection="column"
      justifyContent="center"
      key={id}
      m="0 auto"
      p={4}
      width={['100%', '80%']}>
      <blockquote>
        <Text fontSize={[16, 32]} textAlign="center">
          {content}
        </Text>
      </blockquote>
      <ClickableText
        onClick={() => {
          onSelectAuthor(author);
        }}>
        — {author || 'Unknown'}
      </ClickableText>
      <Flex mt={[2, 3]}>
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
