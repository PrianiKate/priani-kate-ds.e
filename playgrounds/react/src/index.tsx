import React from 'react';
import ReactDOM from 'react-dom';

import { Color, Text } from '@ds.e/react';

import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/global.css';

ReactDOM.render(
  <>
    <Text size="xl">
      Test
    </Text>
    <Color hexCode='#000' />
  </>,
  document.querySelector('#root')
);