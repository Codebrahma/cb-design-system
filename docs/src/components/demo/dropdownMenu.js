import React from 'react';
import { DropdownMenu } from 'cb-design-system';

export default () => (
  <DropdownMenu
    options={[
      { label: 'Menu Item One', value: 'A0' },
      { label: 'Menu Item Two', value: 'B0' },
      { label: 'Menu Item Three', value: 'C0' },
      { label: 'Menu Item Four', value: 'D0' },
      { label: 'Menu Item Five', value: 'E0' },
      { label: 'Menu Item Six', value: 'F0' },
      { label: 'Menu Item Seven', value: 'G0' },
    ]}
    onSelect={(value, event) => console.log(value)}
  >
    Trigger &#9662;
  </DropdownMenu>
);
