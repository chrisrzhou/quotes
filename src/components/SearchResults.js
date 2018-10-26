import {Box, Flex, Text} from 'rebass';
import {selectAuthor, selectQuote, selectTag, setMenuMode} from 'redux/actions';

import ClickableText from './ui/ClickableText';
import MatchedText from './ui/MatchedText';
import React from 'react';
import Row from './ui/Row';
import {colors} from 'styles';
import {connect} from 'react-redux';
import {getFilteredQuotes} from 'redux/selectors';

const SearchResults = ({
  searchResults,
  searchString,
  onSelectAuthor,
  onSelectTag,
  onSelectQuote,
  onSetMenuMode,
}) => {
  return (
    <Flex
      css={`
        visibility: hidden;
        > * {
          visibility: visible;
          transition: opacity 0.3s ease-in-out;
        }
        :hover > * {
          opacity: 0.3;
        }
        > *:hover {
          opacity: 1;
        }
      `}
      flexDirection="column">
      <Text color={colors.secondary}>{searchResults.length} quotes</Text>
      {searchResults.map(({author, content, id, tags}) => {
        return (
          <Box
            css={`
              border-left: 4px solid ${colors.secondary};
              cursor: pointer;
            `}
            key={id}
            pl={3}
            my={3}>
            <MatchedText
              matchString={searchString}
              onClick={() => {
                onSelectQuote(id);
                onSetMenuMode();
              }}
              text={content}
            />
            <Row align="left">
              <ClickableText onClick={() => onSelectAuthor(author)}>
                @{author || 'Unknown'}
              </ClickableText>
              {tags.map(tag => (
                <ClickableText key={tag} onClick={() => onSelectTag(tag)}>
                  #{tag}
                </ClickableText>
              ))}
            </Row>
          </Box>
        );
      })}
    </Flex>
  );
};

export default connect(
  state => ({
    searchString: state.searchString,
    searchResults: getFilteredQuotes(state),
  }),
  {
    onSelectQuote: selectQuote,
    onSetMenuMode: setMenuMode,
    onSelectAuthor: selectAuthor,
    onSelectTag: selectTag,
  },
)(SearchResults);
