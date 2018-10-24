import {getTags} from './selectors';

test('returns empty array for no tags', () => {
  expect(getTags({quotes: []})).toEqual([]);
  expect(
    getTags({
      quotes: [
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
      ],
    }),
  ).toEqual([]);
});

test('returns tags', () => {
  expect(
    getTags({
      quotes: [
        {
          author: 'a',
          tags: ['tag4'],
        },
        {
          author: 'b',
          tags: ['tag1'],
        },
        {
          tags: [],
        },
        {
          author: 'c',
          tags: ['tag2'],
        },
      ],
    }),
  ).toEqual([
    {count: 1, isSelected: false, value: 'tag4'},
    {count: 1, isSelected: false, value: 'tag1'},
    {count: 1, isSelected: false, value: 'tag2'},
  ]);
});

test('dedupes and sorts tags descending', () => {
  expect(
    getTags({
      quotes: [
        {
          author: 'a',
          tags: ['tag4', 'tag3'],
        },
        {
          author: 'b',
          tags: ['tag1'],
        },
        {
          tags: [],
        },
        {
          author: 'a',
          tags: ['tag3', 'tag1'],
        },
        {
          author: 'c',
          tags: ['tag1'],
        },
      ],
    }),
  ).toEqual([
    {count: 3, isSelected: false, value: 'tag1'},
    {count: 2, isSelected: false, value: 'tag3'},
    {count: 1, isSelected: false, value: 'tag4'},
  ]);
});

test('sorts by selected tags first, and then by count', () => {
  expect(
    getTags({
      quotes: [
        {
          author: 'a',
          tags: ['tag4', 'tag3'],
        },
        {
          author: 'b',
          tags: ['tag1'],
        },
        {
          tags: [],
        },
        {
          author: 'a',
          tags: ['tag3', 'tag1'],
        },
        {
          author: 'c',
          tags: ['tag1'],
        },
        {
          author: 'c',
          tags: ['tag5'],
        },
      ],
      selectedTags: ['tag4', 'tag5', 'tag3'],
    }),
  ).toEqual([
    {count: 2, isSelected: true, value: 'tag3'},
    {count: 1, isSelected: true, value: 'tag4'},
    {count: 1, isSelected: true, value: 'tag5'},
    {count: 3, isSelected: false, value: 'tag1'},
  ]);
});
