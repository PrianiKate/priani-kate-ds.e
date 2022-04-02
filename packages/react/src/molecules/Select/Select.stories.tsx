import React from 'react';
import Select from './Select';
import '@priani-kate-ds.e/scss/lib/Select.css';

import { withA11y } from '@storybook/addon-a11y';

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

export default {
  title: 'Molecules|Select',
  decorators: [withA11y]
}

export const Common = () => <Select options={options} />;

export const RenderOption = () => 
  <Select
    options={options}
    renderOption={({ getOptionRecommendedProps, option, isSelected }) =>
      <span {...getOptionRecommendedProps()}>{option.label} {isSelected ? 'SELECTED' : '' }</span>
    } 
  />;

export const CustomLabel = () => <Select label='Select a color' options={options} />;
