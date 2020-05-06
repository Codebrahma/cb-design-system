# InputGroup

Primitive InputGroup component with variants

<Editor>

```jsx
<InputGroup label="Name" labelPosition="right" />
```

</Editor>

## props

| prop          | type   | defaultProp | Description              |
| ------------- | ------ | ----------- | ------------------------ |
| label         | string | -           |                          |
| labelPosition | string | left        | left, right, top, bottom |
| variant       | string | primary     |                          |
| as            | string | input       | input, textarea          |

accepts **all** input props

## Default theme

```
inputGroup: {
  primary: {
    marginTop: '10px',
    label: {
      p: 3,
    },
    input: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'borderGray',
    },
  },
},
```
