import React from 'react'
import { ThemeProvider, IconButton, ReadMore, Truncate, Input, Hide } from 'cb-design-system'
import theme from './theme';

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

    <Input type='text' placeholder='type here...'  />
    <br/>

    <Hide when={2}><h1>asdasdsd</h1></Hide>
    
  </ThemeProvider>
)
