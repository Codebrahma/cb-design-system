# BreadCrumbs

Primitive BreadCrumbs component with variants

<Editor>

```jsx
<Breadcrumbs
  options={[
    { label: 'link1', value: '/1' },
    { label: 'link2', value: '/2' },
    { label: 'link3', value: '/3' },
  ]}
  onSelect={v => alert(v.label)}
  separater="/"
/>
```

</Editor>

## props

| prop      | type            | defaultProp |
| --------- | --------------- | ----------- |
| options   | Array of object |             |
| onSelect  | func            |             |
| variant   | string          | primary     |
| separater | string / node   | >           |
| tabIndex  | string          | 0           |
