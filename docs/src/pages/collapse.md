# Collapse

Primitive Collapse component with variants

<Editor>

```jsx
<Collapse head={() => <p>Collapse Head</p>}>
  <Box>
    <h1>Collapse body</h1>
  </Box>
</Collapse>
```

</Editor>

## props

| prop               | type        | defaultProp | desc                                                               |
| ------------------ | ----------- | ----------- | ------------------------------------------------------------------ |
| head               | func/node   |             |
| isOpen             | bool        | true        | set's the default state of collapse open/close                     |
| transitionDuration | number      | 200         | set's transition duration                                          |
| transitionFunction | string/func | 'linear'    | set's transition timming function                                  |
| isCollapsed        | func        | null        | A callback function that trigger's when the collapse state changes |
| variant            | string      | primary     |

# Default Theme

```
collapse: {
  primary: {
    head: {
      p: 3,
      bg: 'borderGray',
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'darkGray',
      cursor: 'pointer',
    },
    body: {
      p: 4,
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'darkGray',
    },
  },
}
```
