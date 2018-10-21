const sortDescendingByCount = countMap => {
  return Object.values(countMap).sort((a, b) => {
    return b.count - a.count;
  });
};

export const getQuote = state => {
  return state.quotes[state.selectedQuoteIndex];
};

export const getFilteredQuotes = state => {
  const {quotes, selectedAuthor, selectedTag, searchString} = state;
  const RE_SEARCH_STRING = new RegExp(searchString, 'i');
  return quotes.filter(quote => {
    if (
      (selectedAuthor && selectedAuthor !== quote.author) ||
      (selectedTag && !quote.tags.includes(selectedTag)) ||
      (searchString && !quote.content.match(RE_SEARCH_STRING))
    ) {
      return false;
    }
    return true;
  });
};

export const getAuthors = state => {
  const countMap = {};
  state.quotes.forEach(({author}) => {
    if (author != null) {
      if (!countMap[author]) {
        countMap[author] = {
          value: author,
          count: 0,
        };
      }
      countMap[author].count++;
    }
  });
  return sortDescendingByCount(countMap);
};

export const getTags = state => {
  const countMap = {};
  state.quotes.forEach(quote => {
    quote.tags.forEach(tag => {
      if (tag != null) {
        if (!countMap[tag]) {
          countMap[tag] = {
            value: tag,
            count: 0,
          };
        }
        countMap[tag].count++;
      }
    });
  });
  return sortDescendingByCount(countMap);
};
