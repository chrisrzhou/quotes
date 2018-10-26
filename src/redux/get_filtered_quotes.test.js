import {getFilteredQuotes} from './selectors';

test('returns empty array for no quotes', () => {
  expect(
    getFilteredQuotes({
      quotes: [],
    }),
  ).toEqual([]);
});

test('nothing to filter (empty search inputs)', () => {
  const quotes = [
    {
      content: 'a',
      tags: [],
    },
    {
      content: 'b',
      tags: [],
    },
    {
      content: 'c',
      tags: [],
    },
  ];
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: [],
      selectedTags: [],
      searchString: '',
    }),
  ).toEqual([
    {
      content: 'a',
      tags: [],
    },
    {
      content: 'b',
      tags: [],
    },
    {
      content: 'c',
      tags: [],
    },
  ]);
});

test('filter by searchString (insensitive)', () => {
  const quotes = [
    {
      content: 'a',
      tags: [],
    },
    {
      content: 'baa',
      tags: [],
    },
    {
      content: 'c',
      tags: [],
    },
    {
      content: 'cAd',
      tags: [],
    },
  ];
  expect(
    getFilteredQuotes({
      quotes,
      searchString: 'a',
      selectedAuthors: [],
      selectedTags: [],
    }),
  ).toEqual([
    {
      content: 'a',
      tags: [],
    },
    {
      content: 'baa',
      tags: [],
    },
    {
      content: 'cAd',
      tags: [],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      searchString: 'AA',
      selectedAuthors: [],
      selectedTags: [],
    }),
  ).toEqual([
    {
      content: 'baa',
      tags: [],
    },
  ]);
});

test('filter by author', () => {
  const quotes = [
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'y',
      content: 'baa',
      tags: [],
    },
    {
      author: 'x',
      content: 'c',
      tags: ['tag3'],
    },
    {
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ];
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['x'],
      selectedTags: [],
    }),
  ).toEqual([
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'x',
      content: 'c',
      tags: ['tag3'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['y'],
      selectedTags: [],
    }),
  ).toEqual([
    {
      author: 'y',
      content: 'baa',
      tags: [],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['x', 'y'],
      selectedTags: [],
    }),
  ).toEqual([
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'y',
      content: 'baa',
      tags: [],
    },
    {
      author: 'x',
      content: 'c',
      tags: ['tag3'],
    },
  ]);
});

test('filter by tags', () => {
  const quotes = [
    {
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      content: 'baa',
      tags: [],
    },
    {
      content: 'c',
      tags: ['tag3'],
    },
    {
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ];
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: [],
      selectedTags: ['tag1'],
    }),
  ).toEqual([
    {
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: [],
      selectedTags: ['tag3'],
    }),
  ).toEqual([
    {
      content: 'c',
      tags: ['tag3'],
    },
    {
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
});

test('filter by all combinations', () => {
  const quotes = [
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'x',
      content: 'baa',
      tags: [],
    },
    {
      author: 'y',
      content: 'c',
      tags: ['tag3'],
    },
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ];
  expect(
    getFilteredQuotes({
      quotes,
      searchString: 'a',
      selectedAuthors: [],
      selectedTags: ['tag1'],
    }),
  ).toEqual([
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['x'],
      searchString: 'a',
      selectedTags: ['tag1'],
    }),
  ).toEqual([
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'x',
      content: 'baa',
      tags: [],
    },
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['y'],
      selectedTags: [],
      searchString: 'c',
    }),
  ).toEqual([
    {
      author: 'y',
      content: 'c',
      tags: ['tag3'],
    },
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['y'],
      searchString: 'c',
      selectedTags: ['tag1'],
    }),
  ).toEqual([
    {
      author: 'y',
      content: 'c',
      tags: ['tag3'],
    },
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['y'],
      selectedTags: ['badtag'],
      searchString: 'c',
    }),
  ).toEqual([
    {
      author: 'y',
      content: 'c',
      tags: ['tag3'],
    },
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['badauthor'],
      selectedTags: [],
      searchString: 'c',
    }),
  ).toEqual([]);
  expect(
    getFilteredQuotes({
      quotes,
      selectedAuthors: ['y'],
      selectedTags: [],
      searchString: 'badcontent',
    }),
  ).toEqual([]);
});
