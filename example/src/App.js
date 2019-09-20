import React, { Component } from 'react';

import Image from 'reactimage2base64';

export default class App extends Component {
  render () {
    return (
      <div>
        <Image src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' />
      </div>
    )
  }
}
