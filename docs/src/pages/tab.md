# Tab

Primitive Tab component styled as tabs.

<Editor>

```jsx
<Tabs selected="2">
  <Tabs.tab label="Tab 1">
    <h2>This is tab 1 content</h2>
  </Tabs.tab>
  <Tabs.tab label="Tab 2">
    <h2>you can render anything you want here</h2>
  </Tabs.tab>
  <Tabs.tab label="Tab 3">
    <h2>This is tab 3 content</h2>
  </Tabs.tab>
</Tabs>
```

</Editor>

# Props

---

| Prop     | Type            | Default Prop | Desc                                                        |
| -------- | --------------- | ------------ | ----------------------------------------------------------- |
| selected | string / number | 1            | To determine which tab should be displayed on initial mount |
| varaint  | string          | 'primary'    | set's the default state of collapse open/close              |

## Tabs.tab

| Prop  | Type                 | Default Prop | Desc                      |
| ----- | -------------------- | ------------ | ------------------------- |
| label | string / func / node | null         | To set label for each tab |

## Default theme

---

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
