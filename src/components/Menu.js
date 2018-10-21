import {getAuthors, getTags} from 'redux/selectors';
import {
  search,
  selectAuthor,
  selectQuote,
  selectTag,
  setMenuMode,
} from 'redux/actions';

import ClickableText from './ui/ClickableText';
import {Flex} from 'rebass';
import Hotkeys from './Hotkeys';
import Item from './ui/Item';
import ItemList from './ui/ItemList';
import React from 'react';
import Row from './ui/Row';
import Search from './Search';
import Text from './ui/Text';
import {colors} from 'styles';
import {connect} from 'react-redux';

const Menu = ({
  authors,
  menuMode,
  onSearch,
  onSelectAuthor,
  onSelectQuote,
  onSelectTag,
  onSetMenuMode,
  searchString,
  selectedAuthor,
  selectedTag,
  tags,
}) => {
  if (!menuMode) {
    return null;
  }
  let content;
  let title;
  switch (menuMode) {
    case 'quote':
      content = <Search />;
      title = (
        <div>
          Search quotes
          <Row align="left">
            {selectedAuthor ? (
              <Item
                label={`@${selectedAuthor}`}
                onClear={() => onSelectAuthor()}
                onClick={() => onSetMenuMode('author')}
              />
            ) : (
              <Item
                label="filter authors"
                onClick={() => onSetMenuMode('author')}
              />
            )}
            {selectedTag ? (
              <Item
                label={`#${selectedTag}`}
                onClear={() => onSelectTag()}
                onClick={() => onSetMenuMode('tag')}
              />
            ) : (
              <Item label="filter tags" onClick={() => onSetMenuMode('tag')} />
            )}
          </Row>
        </div>
      );
      break;
    case 'author':
      content = (
        <ItemList
          items={authors}
          selectedItem={selectedAuthor}
          onSelectItem={onSelectAuthor}
        />
      );
      title = (
        <div>
          Filter by author
          {selectedAuthor && (
            <Item
              label={`@${selectedAuthor}`}
              onClear={() => onSelectAuthor()}
            />
          )}
        </div>
      );
      break;
    case 'tag':
      content = (
        <ItemList
          items={tags}
          selectedItem={selectedTag}
          onSelectItem={onSelectTag}
        />
      );
      title = (
        <div>
          Filter by tags
          {selectedTag && (
            <Item label={`#${selectedTag}`} onClear={() => onSelectTag()} />
          )}
        </div>
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
      bg="white"
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
        css={`
          flex-shrink: 0;
        `}
        justifyContent="space-between"
        mb="2">
        <Text fontWeight="bold">{title}</Text>
        <ClickableText fontWeight="bold" onClick={() => onSetMenuMode()}>
          back
        </ClickableText>
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
    selectedAuthor: state.selectedAuthor,
    selectedTag: state.selectedTag,
    tags: getTags(state),
  }),
  {
    onSearch: search,
    onSelectAuthor: selectAuthor,
    onSelectQuote: selectQuote,
    onSelectTag: selectTag,
    onSetMenuMode: setMenuMode,
  },
)(Menu);
