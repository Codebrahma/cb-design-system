import React, { Component } from 'react'

import { BackgroundImage, Input } from 'cb-design-system';

export default class App extends Component {
  render () {
    return (
      <div>
        <BackgroundImage imageUrl="https://picsum.photos/200/300" p='10px'>
          <h1>sample text</h1>
        </BackgroundImage>
        <Input type='text'/>
      </div>
    )
  }
}
