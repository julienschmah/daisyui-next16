import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../app/components/UI/Text';

const meta: Meta<typeof Text> = {
  title: 'UI/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'label', 'caption', 'badge', 'subtitle'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'semibold', 'bold', 'extrabold'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text - standard paragraph text used throughout the application.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'This is a label',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text - smaller secondary text',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Text variant="body">Body text variant</Text>
      <Text variant="label">Label variant</Text>
      <Text variant="caption">Caption variant</Text>
      <Text variant="badge">Badge variant</Text>
      <Text variant="subtitle">Subtitle variant</Text>
    </div>
  ),
};
