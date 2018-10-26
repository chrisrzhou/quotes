import {Box, Flex, Text} from 'rebass';
import {
  clearAllAuthors,
  clearAllTags,
  search,
  selectAuthor,
  selectTag,
  setMenuMode,
} from 'redux/actions';
import {getAuthors, getTags} from 'redux/selectors';

import ClickableText from './ui/ClickableText';
import Hotkeys from './Hotkeys';
import NavItem from './ui/NavItem';
import React from 'react';
import SearchResults from './SearchResults';
import TokenList from './ui/TokenList';
import {colors} from 'styles';
import {connect} from 'react-redux';

const MENU_FONT_SIZE = 20;

const Menu = ({
  authors,
  menuMode,
  onClearAllAuthors,
  onClearAllTags,
  onSearch,
  onSelectAuthor,
  onSelectTag,
  onSetMenuMode,
  searchString,
  selectedAuthors,
  selectedTags,
  tags,
}) => {
  if (!menuMode) {
    return null;
  }
  let content;
  let title;
  switch (menuMode) {
    case 'quote':
      content = <SearchResults />;
      title = (
        <Box
          css={`
            width: 100%;
            input {
              background: ${colors.wash};
              border: 1px solid ${colors.wash};
              border-radius: 8px;
              font-family: 'Source Serif Pro', serif;
              font-size: ${MENU_FONT_SIZE}px;
              line-height: 1.6;
              padding: 8px;
              transition: all 0.5s ease-in-out
              width: 100%;

              :focus {
                background: ${colors.white};
                border: 1px solid ${colors.hover};
                outline: none;
              }
            }
          `}
          pr={3}>
          <input
            onChange={e => {
              onSearch(e.target.value);
            }}
            placeholder="Search quotes"
            value={searchString}
          />
        </Box>
      );
      break;
    case 'author':
      content = (
        <TokenList
          items={authors}
          selectedItem={selectedAuthors}
          onSelectItem={onSelectAuthor}
        />
      );
      title = (
        <Flex alignItems="center">
          Filter authors
          {selectedAuthors.length > 0 && (
            <ClickableText ml={2} onClick={onClearAllAuthors}>
              (clear)
            </ClickableText>
          )}
        </Flex>
      );
      break;
    case 'tag':
      content = (
        <TokenList
          items={tags}
          selectedItem={selectedTags}
          onSelectItem={onSelectTag}
        />
      );
      title = (
        <Flex alignItems="center">
          Filter tags
          {selectedTags.length > 0 && (
            <ClickableText ml={2} onClick={onClearAllTags}>
              (clear)
            </ClickableText>
          )}
        </Flex>
      );
      break;
    case 'help':
      content = <Hotkeys />;
      title = 'Hotkey helper';
      break;
    default:
      return null;
  }
  return (
    <Flex
      bg={colors.white}
      css={`
        animation: menuslide 1s ease-in-out;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        top: 50px;
        z-index: 1;

        @keyframes menuslide {
          0% {
            transform: translateY(-50%);
            opacity: 0;
          }
          50% {
            transform: translateY(0);
          }
          100% {
            opacity: 1;
          }
        }
      `}
      flexDirection="column"
      p={3}>
      <Flex
        alignItems="center"
        css={`
          flex-shrink: 0;
        `}
        justifyContent="space-between"
        mb="2">
        <Text
          css={`
            box-sizing: border-box;
            flex-grow: 1;
          `}
          fontSize={MENU_FONT_SIZE}
          fontWeight="bold"
          pr={3}>
          {title}
        </Text>
        <NavItem label="✕" onClick={() => onSetMenuMode()} />
      </Flex>
      <Flex
        css={`
          border-top: 2px solid ${colors.secondary};
          overflow: auto;
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: ${colors.wash};
          }
        `}
        flexDirection="column"
        py={2}>
        {content}
      </Flex>
    </Flex>
  );
};

export default connect(
  state => ({
    authors: getAuthors(state),
    menuMode: state.menuMode,
    searchString: state.searchString,
    selectedAuthors: state.selectedAuthors,
    selectedTags: state.selectedTags,
    tags: getTags(state),
  }),
  {
    onClearAllAuthors: clearAllAuthors,
    onClearAllTags: clearAllTags,
    onSearch: search,
    onSelectAuthor: selectAuthor,
    onSelectTag: selectTag,
    onSetMenuMode: setMenuMode,
  },
)(Menu);
