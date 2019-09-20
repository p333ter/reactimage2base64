import React, { Component } from 'react';

import Image from 'image-to-base64';

export default class App extends Component {
  render () {
    return (
      <div>
        <Image src='https://restcountries.eu/data/aus.svg' />
      </div>
    )
  }
}
