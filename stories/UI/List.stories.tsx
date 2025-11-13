import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List } from '../../src/components/ui/List';

const meta: Meta<typeof List> = {
  title: 'UI/List',
  component: List,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 1, label: 'First item' },
      { id: 2, label: 'Second item' },
      { id: 3, label: 'Third item' },
    ],
  },
};

export const WithDescriptions: Story = {
  args: {
    items: [
      { id: 1, label: 'Task 1', description: 'Complete the design' },
      { id: 2, label: 'Task 2', description: 'Implement functionality' },
      { id: 3, label: 'Task 3', description: 'Test and deploy' },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: 1, label: 'Active', badge: 'Now', badgeColor: 'success' },
      { id: 2, label: 'Pending', badge: '2', badgeColor: 'warning' },
      { id: 3, label: 'Done', badge: '✓', badgeColor: 'info' },
    ],
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    items: [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' },
    ],
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    items: [
      { id: 1, label: 'Compact item 1' },
      { id: 2, label: 'Compact item 2' },
      { id: 3, label: 'Compact item 3' },
    ],
  },
};
