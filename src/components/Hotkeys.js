import Hotkey from './ui/Hotkey';
import List from './ui/List';
import React from 'react';

export default () => (
  <List
    items={[
      <Hotkey description="hotkey help" hotkey="?" />,
      <Hotkey description="search quotes" hotkey="Q / S" />,
      <Hotkey description="search authors" hotkey="A" />,
      <Hotkey description="search tags" hotkey="T" />,
      <Hotkey description="previous quote" hotkey="⇦" />,
      <Hotkey description="next quote" hotkey="⇨" />,
      <Hotkey description="hide menu" hotkey="ESC" />,
      <Hotkey description="reset" hotkey="R" />,
      <Hotkey description="autoplay (on/off)" hotkey="SPACE" />,
    ]}
  />
);
