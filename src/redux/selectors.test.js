import {filterQuotes} from './selectors';

test('returns empty array for no quotes', () => {
  expect(
    filterQuotes({
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
  expect(filterQuotes({quotes})).toEqual([
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
  expect(
    filterQuotes({
      quotes,
      selectedAuthor: '',
      selectedTag: '',
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
    filterQuotes({
      quotes,
      searchString: 'a',
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
    filterQuotes({
      quotes,
      searchString: 'AA',
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
    filterQuotes({
      quotes,
      selectedAuthor: 'x',
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
    filterQuotes({
      quotes,
      selectedAuthor: 'y',
    }),
  ).toEqual([
    {
      author: 'y',
      content: 'baa',
      tags: [],
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
    filterQuotes({
      quotes,
      selectedTag: 'tag1',
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
    filterQuotes({
      quotes,
      selectedTag: 'tag3',
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
    filterQuotes({
      quotes,
      searchString: 'a',
      selectedTag: 'tag1',
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
    filterQuotes({
      quotes,
      selectedAuthor: 'x',
      searchString: 'a',
      selectedTag: 'tag1',
    }),
  ).toEqual([
    {
      author: 'x',
      content: 'a',
      tags: ['tag1', 'tag2'],
    },
  ]);
  expect(
    filterQuotes({
      quotes,
      selectedAuthor: 'y',
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
    filterQuotes({
      quotes,
      selectedAuthor: 'y',
      searchString: 'c',
      selectedTag: 'tag1',
    }),
  ).toEqual([
    {
      author: 'y',
      content: 'cAd',
      tags: ['tag3', 'tag1'],
    },
  ]);
  expect(
    filterQuotes({
      quotes,
      selectedAuthor: 'y',
      searchString: 'c',
      selectedTag: 'badtag',
    }),
  ).toEqual([]);
  expect(
    filterQuotes({
      quotes,
      selectedAuthor: 'badauthor',
      searchString: 'c',
    }),
  ).toEqual([]);
  expect(
    filterQuotes({
      quotes,
      selectedAuthor: 'y',
      searchString: 'badcontent',
    }),
  ).toEqual([]);
});
