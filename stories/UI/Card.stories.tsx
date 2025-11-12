import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../app/components/UI/Card';
import { Text } from '../../app/components/UI/Text';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <div className="p-6">
        <Text variant="label">Card Title</Text>
        <Text variant="body" className="mt-2">
          This is a simple card with content inside.
        </Text>
      </div>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card>
      <div className="aspect-video bg-gradient-to-br from-primary to-secondary" />
      <div className="p-6">
        <Text variant="label">Card with Image</Text>
        <Text variant="body" className="mt-2">
          Cards can contain images, text, and other content.
        </Text>
      </div>
    </Card>
  ),
};

export const WithDarkBackground: Story = {
  render: () => (
    <Card className="bg-gray-900">
      <div className="p-6">
        <Text variant="label" className="text-white">
          Dark Card
        </Text>
        <Text variant="body" className="mt-2 text-gray-300">
          Cards work with different background colors.
        </Text>
      </div>
    </Card>
  ),
};
