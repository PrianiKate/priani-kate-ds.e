import React from 'react';
import ReactDOM from 'react-dom';

import { Color, Text, Margin } from '@ds.e/react';

import '@ds.e/scss/lib/Utilities.css';
import '@ds.e/scss/lib/Text.css';
import '@ds.e/scss/lib/Margin.css';
import '@ds.e/scss/lib/global.css';

ReactDOM.render(
  <div>
    <Margin>
      <Text size="xl">
        Test
      </Text>
    </Margin>
    <Color hexCode='#000' />
  </div>,
  document.querySelector('#root')
);