import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../../app/components/UI/Header';

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Welcome to Our App',
    subtitle: 'Discover amazing features and capabilities',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a longer header title that demonstrates how the header handles multi-line text',
    subtitle: 'With a subtitle for additional context',
  },
};
