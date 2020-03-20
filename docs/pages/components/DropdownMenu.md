# DropdownMenu

Primitive DropdownMenu component with variants

```.jsx
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
    onSelect={(e, value) => console.log(value)}
  >
    Trigger
  </DropdownMenu>
```