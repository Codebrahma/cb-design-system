import React, { useState } from 'react';
import { Box, Button, Flex, Modal, ThemeProvider } from 'cb-design-system';
import theme from './../../theme';

const themeForModalVariantDemo = {
  ...theme,
  modal: {
    ...(theme.modal || {}),
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
        fontSize: 'h1',
        top: 0,
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
  },
};

const Footer = ({ closeModal }) => (
  <Flex p={4} css={{ justifyContent: 'flex-end' }}>
    <Button variant="primary" onClick={closeModal}>
      Close me!
    </Button>
  </Flex>
);

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemeProvider theme={themeForModalVariantDemo}>
      <Box>
        <Modal
          open={isOpen}
          body="Hey There! I'm a demo pop up!"
          footer={() => <Footer closeModal={() => setIsOpen(false)} />}
          onClose={() => setIsOpen(false)}
          variant="rich"
        />
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </Box>
    </ThemeProvider>
  );
};
