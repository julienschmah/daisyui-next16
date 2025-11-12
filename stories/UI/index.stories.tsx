import React from 'react';
import { Meta } from '@storybook/react';
import * as UI from '../../app/components/UI';

const meta: Meta = {
  title: 'UI/Introduction',
  tags: ['autodocs'],
};

export default meta;

export const Overview = () => (
  <div style={{ display: 'grid', gap: 12 }}>
    {/* supply minimal props where necessary */}
    <UI.Header title="Example Header" subtitle="Subtitle" />
    <UI.Text variant="body">Example text</UI.Text>
    <UI.Button variant="primary">Primary</UI.Button>
    <UI.Badge>Badge</UI.Badge>
    <UI.Card>
      <div style={{ padding: 12 }}>Card content</div>
    </UI.Card>
  </div>
);
