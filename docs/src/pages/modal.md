import ModalStructure from './../images/modal-structure.png';

# Modal

A Modal is composed with the building blocks given below.

- Overlay
- Content Container
- Header
- Body
- Footer
- Close Button

<img src={ModalStructure} alt="Modal structure" />

Modal can be created in two ways.

- Using `Modal` component
- Using `openModal` helper

## Using `Modal` Component

```jsx
const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const header = () => <h3>Title</h3>;
  const body = () => <p>This is body</p>;

  return (
    <Box>
      <Modal
        open={isOpen}
        header="Title"
        body="This is body"
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    </Box>
  );
};
```

<Editor>

```jsx
<ModalDemo />
```

</Editor>

### Props

| Prop                     | Type                     | Description                                                                                                        |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `open`                   | boolean                  | Controls visibility of modal                                                                                       |
| `onClose`                | function                 | Executed when modal is closed                                                                                      |
| `dismissOnEscape`        | boolean                  | Pressing `Esc` key should close the modal or not                                                                   |
| `dismissOnBackdropClick` | boolean                  | Clicking modal backdrop should close the modal or not                                                              |
| `noCloseButton`          | boolean                  | Controls the existence of close button                                                                             |
| `header`                 | String or ReactComponent | Header component for modal                                                                                         |
| `body`                   | String or ReactComponent | Body component for modal                                                                                           |
| `footer`                 | String or ReactComponent | Footer component for modal                                                                                         |
| `closeButton`            | ReactComponent           | `Close` button to override default close button of modal                                                           |
| `variant`                | string                   | Property to apply customize modal styles with theme.json. Click [here](/theming) to know more about theming modals |

## Using `openModal` helper method

<Editor>

```jsx
<Button
  onClick={() =>
    openModal({
      header: 'Hello',
      body: "This modal is opened via 'openModal' method",
      closeOnEscape: true,
    })
  }
>
  Open Modal
</Button>
```

</Editor>
