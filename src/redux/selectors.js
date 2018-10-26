const sortBySelectedAndCount = countMap => {
  return Object.values(countMap).sort((a, b) => {
    return b.isSelected - a.isSelected || b.count - a.count;
  });
};

export const getQuote = state => {
  return state.quotes[state.quoteId];
};

export const getFilteredQuotes = state => {
  const {quotes, selectedAuthors, selectedTags, searchString} = state;
  const RE_SEARCH_STRING = new RegExp(searchString, 'i');
  return Object.values(quotes)
    .filter(quote => {
      if (
        (selectedAuthors.length === 0 && selectedTags.length === 0) ||
        (selectedAuthors.length > 0 &&
          selectedAuthors.includes(quote.author)) ||
        (selectedTags.length > 0 &&
          quote.tags.some(tag => selectedTags.includes(tag)))
      ) {
        return (
          !searchString ||
          (searchString && quote.content.match(RE_SEARCH_STRING))
        );
      }
      return false;
    })
    .slice(0, 100);
};

export const getAuthors = state => {
  const countMap = {};
  const selectedAuthorsSet = new Set(state.selectedAuthors);
  Object.values(state.quotes).forEach(({author}) => {
    if (author != null) {
      if (!countMap[author]) {
        countMap[author] = {
          isSelected: selectedAuthorsSet.has(author),
          count: 0,
          value: author,
        };
      }
      countMap[author].count++;
    }
  });
  return sortBySelectedAndCount(countMap);
};

export const getTags = state => {
  const countMap = {};
  const selectedTagsSet = new Set(state.selectedTags);
  Object.values(state.quotes).forEach(quote => {
    quote.tags.forEach(tag => {
      if (tag != null) {
        if (!countMap[tag]) {
          countMap[tag] = {
            count: 0,
            isSelected: selectedTagsSet.has(tag),
            value: tag,
          };
        }
        countMap[tag].count++;
      }
    });
  });
  return sortBySelectedAndCount(countMap);
};
