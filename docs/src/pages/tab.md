# Tab

Primitive Tab component styled as tabs.

<Editor>

```jsx
<Tabs selected="1">
  <Tabs.tab label="Tab 1">This is tab test1</Tabs.tab>
  <Tabs.tab label="Tab 2">You can render anything you want here</Tabs.tab>
  <Tabs.tab label="Tab 3">This is tab test3</Tabs.tab>
</Tabs>
```

</Editor>

# Props

| Prop     | Type            | Default Prop | Desc                                                        |
| -------- | --------------- | ------------ | ----------------------------------------------------------- |
| selected | string / number | 1            | To determine which tab should be displayed on initial mount |
| varaint  | string          | 'primary'    | set's the default state of collapse open/close              |

## Tabs.tab

| Prop  | Type                 | Default Prop | Desc                      |
| ----- | -------------------- | ------------ | ------------------------- |
| label | string / func / node | null         | To set label for each tab |

# Default theme

```
tabs: {
  primary: {
    tabContainer: {
      bg: 'borderGray',
    },
    tab: {
      color: 'primaryLight',
      px: 4,
      py: 3,
    },
    tabSelected: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'darkGray',
      borderBottomColor: '#fff',
      marginBottom: '-1px',
      bg: '#fff',
    },
    content: {
      p: 3,
      mt: 2,
      bg: 'border',
      color: 'text',
    },
  },
},
```
