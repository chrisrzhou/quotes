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

test('Correctly dedupes authors', () => {
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
    {count: 2, value: 'a'},
    {count: 1, value: 'b'},
    {count: 1, value: 'c'},
  ]);
});
