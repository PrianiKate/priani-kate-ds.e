import React from 'react';
import ReactDOM from 'react-dom';

import { Select } from '@priani-kate-ds.e/react';

import '@priani-kate-ds.e/scss/lib/Utilities.css';
import '@priani-kate-ds.e/scss/lib/Text.css';
import '@priani-kate-ds.e/scss/lib/Margin.css';
import '@priani-kate-ds.e/scss/lib/global.css';
import '@priani-kate-ds.e/scss/lib/Select.css';

const options = [
  {
    label: 'Strict Black',
    value: 'black'
  },
  {
    label: 'Heavenly Green',
    value: 'green'
  },
  {
    label: 'Sweet Pink',
    value: 'pink'
  }
];

ReactDOM.render(
  <div style={{ padding: '40px' }}>
    <Select options={options} />
  </div>,
  document.querySelector('#root')
);