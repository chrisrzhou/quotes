export const filterQuotes = state => {
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
