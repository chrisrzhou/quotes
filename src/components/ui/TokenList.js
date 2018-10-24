import List from './List';
import React from 'react';
import Token from './Token';

export default ({items, selectedItem, onSelectItem}) => (
  <List
    items={items.map(({isSelected, count, value}) => (
      <Token
        active={isSelected}
        onClick={() => onSelectItem(value)}
        label={`${value} (${count})`}
      />
    ))}
  />
);
