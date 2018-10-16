import parser from './parser';

test('returns empty array for empty markdown', () => {
  expect(parser('')).toEqual([]);
});

test('returns empty array for markdown without any quotes', () => {
  expect(
    parser(`# This is a header
    - This is a list
      - with
      - items
    [This is a link](https://www.google.com)

    But there are no blockquotes`),
  ).toEqual([]);
});

test('correctly parses out quotes and trims whitespace', () => {
  expect(
    parser(`
      > quote 1    (preserves whitespace)

            > quote 2

      > quote 3
  `),
  ).toEqual([
    {
      author: null,
      content: 'quote 1 (preserves whitespace)',
      tags: [],
    },
    {
      author: null,
      content: 'quote 2',
      tags: [],
    },
    {
      author: null,
      content: 'quote 3',
      tags: [],
    },
  ]);
});

test('excludes malformed quotes', () => {
  expect(
    parser(`
      not a quote

        > quote 2

      >> > quote 3
  `),
  ).toEqual([
    {
      author: null,
      content: 'quote 2',
      tags: [],
    },
    {
      author: null,
      content: 'quote 3',
      tags: [],
    },
  ]);
});

test('correctly parses out quotes and trims whitespace', () => {
  expect(
    parser(`
      > quote 1    (preserves whitespace)
      continues quote 1


      and continues again

      > quote 3
  `),
  ).toEqual([
    {
      author: null,
      content:
        'quote 1 (preserves whitespace) continues quote 1 and continues again',
      tags: [],
    },
    {
      author: null,
      content: 'quote 3',
      tags: [],
    },
  ]);
});

test('correctly parses hashtags', () => {
  expect(
    parser(`
      > quote 1 #tag1 #tag2
      #tag3

      > #invalid_before_quote quote 2

      > quote 3 #malformed#tag
  `),
  ).toEqual([
    {
      author: null,
      content: 'quote 1',
      tags: ['tag1', 'tag2', 'tag3'],
    },
    {
      author: null,
      content: '#invalid_before_quote quote 2',
      tags: [],
    },
    {
      author: null,
      content: 'quote 3',
      tags: ['malformed#tag'],
    },
  ]);
});

test('correctly parses authors', () => {
  expect(
    parser(`
      > quote 1 --Chris Zhou

      > --invalid_author_before_quote quote 2

      > quote 3 --Chris Zhou #tag1 #tag2

      > quote 4 #tag1 #tag2 --invalid_author_after_tags
  `),
  ).toEqual([
    {
      author: 'Chris Zhou',
      content: 'quote 1',
      tags: [],
    },
    {
      author: null,
      content: '--invalid_author_before_quote quote 2',
      tags: [],
    },
    {
      author: 'Chris Zhou',
      content: 'quote 3',
      tags: ['tag1', 'tag2'],
    },
    {
      author: 'invalid_author_after_tags',
      content: 'quote 4 #tag1 #tag2',
      tags: [],
    },
  ]);
});
