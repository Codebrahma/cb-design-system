
# Modal

Modal can be created in two ways.

  - Using `Modal` component
  - Using `openModal` helper

## Using `Modal` Component

```react
const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const header = () => (<h3>Title</h3>);
  const body = () => (<p>This is body</p>);

  return (
    <Box>
      <Modal
        open={isOpen}
        header={header}
        body={body}
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
    </Box>
  );
};
```

```.jsx
  <ModalDemo />
```

### Props

| Prop                         | Type                      | Description                                                                                           |
| ---------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `open`                       | boolean                   | Controls visibility of modal                                                                          |
| `onClose`                    | function                  | Executed when modal is closed                                                                         |
| `dismissOnEscape`            | boolean                   | Pressing `Esc` key should close the modal or not                                                      |
| `dismissOnBackdropClick`     | boolean                   | Clicking modal backdrop should close the modal or not                                                 |
| `noCloseButton`              | boolean                   | Controls the existence of close button                                                                |
| `header`                     | String or ReactComponent  | Header component for modal                                                                            |
| `body`                       | String or ReactComponent  | Body component for modal                                                                              |
| `footer`                     | String or ReactComponent  | Footer component for modal                                                                            |
| `closeButton`                | ReactComponent            | `Close` button to override default close button of modal                                              |

## Using `openModal` helper method

```.jsx
  <Button
    onClick={() => openModal({
      header: () => <h2>Hello!</h2>,
      body: () => <h5>This modal is opened via 'openModal' method</h5>,
      closeOnEscape: true,
    })}
  >
    Open Modal
  </Button>
```
