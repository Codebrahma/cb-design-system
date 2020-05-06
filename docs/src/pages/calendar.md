# Button

Primitive button component with variants

<Editor>

```jsx
<Calendar onChange={date => console.log(date)} />
```

</Editor>

## props

| prop         | type   | desc                                                   |
| ------------ | ------ | ------------------------------------------------------ |
| onChange     | func   | Callback fired whenever there is a change in the date. |
| onClickDay   | func   | callback fired when the day is clicked.                |
| onClickMonth | func   | callback fired when the month is clicked               |
| onClickYear  | func   | callback fired when the year is clicked                |
| variant      | string |
