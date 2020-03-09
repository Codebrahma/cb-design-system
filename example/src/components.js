import React, { useState, Fragment } from "react";
import {Link} from 'react-router-dom';
import {
  ThemeProvider,
  Box,
  Hide,
  IconButton,
  Input,
  Textarea,
  ReadMore,
  Truncate,
  withBeforeAfter,
  Background,
  Absolute,
  Relative,
  Tooltip,
  Button,
  openModal,
  Modal,
  PortableModalContainer,
  Toast,
  openToast,
  PortableToastContainer,
} from "cb-design-system";

import theme from "./theme";

const BoxWithBeforeAndAfter = withBeforeAfter(
  Box,
  {
    content: '""',
    display: "inline-block",
    width: 10,
    height: 10,
    backgroundColor: "tomato"
  },
  {
    content: '""',
    display: "inline-block",
    width: 10,
    height: 10,
    backgroundColor: "primary"
  }
);

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <PortableModalContainer />
      <PortableToastContainer />
      <IconButton icon={<i>Hello</i>} iconFirst={false}>
        Hello
      </IconButton>

      <ReadMore numberOfChars={20}>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter.
      </ReadMore>

      <Truncate>
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century who is thought to have
        scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
        type specimen book.
      </Truncate>

      <Input type="text" placeholder="type here..." />
      <br />
      <Input type="text" placeholder="type here........" />

      <Hide md>
        <h1>asdasdsd</h1>
      </Hide>

      <BoxWithBeforeAndAfter>Hello</BoxWithBeforeAndAfter>

      <Relative>
        <Background bgColor="red">background</Background>
        <Absolute left={"250px"} top="0">
          absolute
        </Absolute>
      </Relative>
      <br />
      <Textarea placeholder="type heree..." />
      <br />

      <Tooltip message="haiiii" bg="primary" color="warning">
        <BoxWithBeforeAndAfter>
          HelloHelloHelloHelloHelloHelloHelloHello
        </BoxWithBeforeAndAfter>
      </Tooltip>

      <div id="modal-container"></div>

      <Button onClick={() => openModal({
        header: 'Hello',
        body: (
          <Fragment>
            <Button onClick={() => openModal({
              header: 'Im inner modal',
            })}>
              Open Modal
            </Button>
            <Link to="/">Home</Link>
          </Fragment>
        ),
      })}>
        Open Modal
      </Button>
      <Button
        onClick={() => openToast({ body: "Action done successfully!", timeout: 10000, variant: 'primary' })}
      >
        Open Toast
      </Button>
      <Button
        onClick={() => openToast({ body: "Action done successfully!", timeout: 10000, variant: 'success' })}
      >
        Open success Toast
      </Button>
    </ThemeProvider>
  );
};
