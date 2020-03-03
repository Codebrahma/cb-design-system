import React from 'react'
import {
  ThemeProvider,
  Box,
  IconButton,
  ReadMore,
  Truncate,
  withBeforeAfter,
  Tooltip,
} from 'cb-design-system'
import theme from './theme';

const BoxWithBeforeAndAfter = withBeforeAfter(Box, {
  content: '""',
  display: 'inline-block',
  width: 10,
  height: 10,
  backgroundColor: 'tomato',
}, {
  content: '""',
  display: 'inline-block',
  width: 10,
  height: 10,
  backgroundColor: 'primary',
});

export default () => (
  <ThemeProvider theme={theme}>
    <IconButton icon={<i>Hello</i>} iconFirst={false}>
      Hello
    </IconButton>

    <ReadMore numberOfChars={20}>
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter.
    </ReadMore>

    <Truncate>
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
    </Truncate>

    <Tooltip message="haiiii" bg="primary" color="warning">
      <BoxWithBeforeAndAfter>HelloHelloHelloHelloHelloHelloHelloHello</BoxWithBeforeAndAfter>
    </Tooltip>
  </ThemeProvider>
)