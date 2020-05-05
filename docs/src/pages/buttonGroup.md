# ButtonGroup

Primitive ButtonGroup component with variants and styled as buttonGroup

<Editor>

```jsx
<ButtonGroup>
  <Button variant="primary">Primary</Button>
  <Button variant="warning">Secondary</Button>
  <Button variant="success">Success</Button>
</ButtonGroup>

<ButtonGroup variant="secondary">
  <Button variant="primary">Primary</Button>
  <Button variant="warning">Secondary</Button>
  <Button variant="error">Success</Button>
</ButtonGroup>
```

</Editor>

## Default theme

```
buttonGroup: {
  primary: {
    borderRadius: 4,
    m: 2,
  },
  secondary: {
    button: {
      mr: 1,
      '&:first-of-type': {
        borderTopLeftRadius: 11,
        borderBottomLeftRadius: 11,
      },
      '&:last-child': {
        borderTopRightRadius: 11,
        borderBottomRightRadius: 11,
      },
    },
  },
}
```
