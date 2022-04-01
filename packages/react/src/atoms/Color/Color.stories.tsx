import React from 'react';
import Color from './Color';
import { text, select } from '@storybook/addon-knobs';

import { Spacing } from '@ds.e/foundation';

import '@ds.e/scss/lib/Utilities.css';

export default {
  title: 'Atoms|Color'
};

export const Common = () => <Color hexCode={text('hexCode', 'pink')} />;
export const CustomDimensions = () => 
  <Color
    hexCode={text('hexCode', 'pink')}
    width={select('width', Object.values(Spacing) as unknown as typeof Spacing, 'xxl')}
    height={select('height', Object.values(Spacing) as unknown as typeof Spacing, 'xxl')}
  />;
