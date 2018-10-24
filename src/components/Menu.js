import {Flex, Text} from 'rebass';
import {getAuthors, getTags} from 'redux/selectors';
import {search, selectAuthor, selectTag, setMenuMode} from 'redux/actions';

import Hotkeys from './Hotkeys';
import NavItem from './ui/NavItem';
import React from 'react';
import SearchResults from './SearchResults';
import TokenList from './ui/TokenList';
import {colors} from 'styles';
import {connect} from 'react-redux';

const Menu = ({
  authors,
  menuMode,
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
        <input
          onChange={e => {
            onSearch(e.target.value);
          }}
          value={searchString}
        />
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
      title = 'Filter authors';
      break;
    case 'tag':
      content = (
        <TokenList
          items={tags}
          selectedItem={selectedTags}
          onSelectItem={onSelectTag}
        />
      );
      title = 'Filter tags';
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
        animation: menuslide 1s ease;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
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
        <Text fontSize={24} fontWeight="bold">
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
          ::-webkit-scrollbar-track {
            background-color: ${colors.wash};
          }
          ::-webkit-scrollbar-thumb {
            background-color: ${colors.secondary};
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
    onSearch: search,
    onSelectAuthor: selectAuthor,
    onSelectTag: selectTag,
    onSetMenuMode: setMenuMode,
  },
)(Menu);
