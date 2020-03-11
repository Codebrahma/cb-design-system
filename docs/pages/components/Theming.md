# Theming

We follow [System UI Theme specification](https://system-ui.com/theme/) with a few optional additions. 

### Theming Atomic Components
Check [Theme UI docs](https://theme-ui.com/theming/) for theming the atoms. To theme, complex components, refer the docs below.

### Theming Complex Components

#### Modal
Modal overlay, content container, header, body, footer and close button can be styled through `theme` object. To customize the style of a modal, create a variant under the themeKey `modal`.

| Component                    | themeKey                             | Description                                                                                           |
| ---------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `overlay`                    | modal.variantName.overlay            | Styles for the `modal` overlay for your variant                                                       |
| `contentContainer`           | modal.variantName.contentContainer   | Styles for the `modal` content container for your variant                                             |
| `header`                     | modal.variantName.header             | Styles for the `modal` header for your variant                                                        |
| `body`                       | modal.variantName.body               | Styles for the `modal` body for your variant                                                          |
| `footer`                     | modal.variantName.footer             | Styles for the `modal` footer for your variant                                                        |
| `closeButton`                | modal.variantName.closeButton        | Styles for the `modal` closeButton for your variant                                                   |

For example, find the custom styling of modal building blocks with a variant named 'rich'
```
  {
    modal: {
      rich: {
        overlay: {
          bg: 'lightGray',
        },
        contentContainer: {
          boxShadow: '1px 1px 3px 1px #435563',
          minHeight: 'auto',
          width: '100%',
          maxWidth: '450px',
        },
        closeButton: {
          fontSize: 6,
          right: '15px',
        },
        body: {
          bg: 'borderGray',
          height: '125px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    }
  }
```

```.jsx
<RichModalDemo />
```