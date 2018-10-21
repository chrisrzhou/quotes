import Item from './Item';
import List from './List';
import React from 'react';

export default ({items, selectedItem, onSelectItem}) => (
  <List
    items={items.map(({count, value}) => (
      <Item
        active={value === selectedItem}
        onClick={() => onSelectItem(value)}
        label={`${value} (${count})`}
      />
    ))}
  />
);
