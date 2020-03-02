import React from 'react'
import { ThemeProvider, IconButton } from 'cb-design-system'

export default () => (
  <ThemeProvider>
    <IconButton icon={<i>Hello</i>} iconFirst={false}>Hello</IconButton>
  </ThemeProvider>
)