# Autocomplete

Primitive Autocomplete component styled as autoComplete.

<Editor>

```jsx
<AutoComplete
  isMulti
  options={[
    { value: 'rustic', label: 'Rustic' },
    { value: 'antique', label: 'Antique' },
    { value: 'vinyl', label: 'Vinyl' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'refurbished', label: 'Refurbished' },
    { value: 'a b', label: 'Aa Baa' },
  ]}
  placeholder="select here"
  onChange={v => console.log('selected', v)}
/>
```

</Editor>
