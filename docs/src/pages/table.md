# Table

Primitive checkbox component styled as Switch.

<Editor>

```jsx
<Table
  dataSource={[
    {
      number: 1,
      name: 'Praveen',
      marks: '50',
    },
    {
      number: 2,
      name: 'Kavin',
      marks: '20',
    },
    {
      number: 3,
      name: 'Rahul',
      marks: '80',
    },
    {
      number: 4,
      name: 'Dhanush',
      marks: '10',
    },
  ]}
  colNames={[
    { title: 'Number', key: 'number' },
    { title: 'Name', key: 'name' },
    {
      title: 'Marks',
      key: 'marks',
      sortable: true,
      render: columnData => {
        if (columnData >= 25) {
          return <p style={{ color: 'green', margin: 0 }}>{columnData}</p>;
        }
        return <p style={{ color: 'red', margin: 0 }}>{columnData}</p>;
      },
    },
  ]}
  hoverable={true}
/>
```

</Editor>



### Props

| Prop                     | Type                     | Description                                                                                                        |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `dataSource`             | object                   | Source of the data applied to the table. .                                                                                        |
| `colNames`               | object                   | Column names of the table.                                                                                      |
| `bordered`               | boolean                  | Apply borders for the table.                          |
| `stripped`               | boolean                  | Makes the table with zebra stripped pattern.                                            |
| `hoverable`              | boolean                  | Apply hover effect on the table.                               |
| `headerColor`            | string                   | Change the header colour of the table.|
| `variant`                | string                   | Property to apply customize modal styles with theme.json. Click [here](/theming) to know more about theming modals |
