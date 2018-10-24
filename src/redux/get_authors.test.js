import {getAuthors} from './selectors';

test('returns empty array for no authors', () => {
  expect(getAuthors({quotes: []})).toEqual([]);
  expect(
    getAuthors({
      quotes: [
        {
          content: 'a',
        },
        {
          content: 'b',
        },
        {
          content: 'c',
        },
      ],
    }),
  ).toEqual([]);
});

test('dedupes authors', () => {
  expect(
    getAuthors({
      quotes: [
        {
          author: 'a',
        },
        {
          author: 'b',
        },
        {},
        {
          author: 'a',
        },
        {
          author: 'c',
        },
      ],
    }),
  ).toEqual([
    {count: 2, isSelected: false, value: 'a'},
    {count: 1, isSelected: false, value: 'b'},
    {count: 1, isSelected: false, value: 'c'},
  ]);
});

test('sorts by selected authors first, and then by counts', () => {
  expect(
    getAuthors({
      quotes: [
        {
          author: 'a',
        },
        {
          author: 'b',
        },
        {},
        {
          author: 'a',
        },
        {
          author: 'c',
        },
        {
          author: 'd',
        },
      ],
      selectedAuthors: ['c', 'a', 'd'],
    }),
  ).toEqual([
    {count: 2, isSelected: true, value: 'a'},
    {count: 1, isSelected: true, value: 'c'},
    {count: 1, isSelected: true, value: 'd'},
    {count: 1, isSelected: false, value: 'b'},
  ]);
});
