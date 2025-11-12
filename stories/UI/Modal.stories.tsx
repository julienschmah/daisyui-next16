import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../../app/components/UI/Modal';
import { Button } from '../../app/components/UI/Button';
import { Text } from '../../app/components/UI/Text';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    backdrop: {
      control: 'select',
      options: ['click', 'none'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Modal Title',
    children: <Text variant="body">This is the modal content.</Text>,
  },
};

export const WithSubtitle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Modal Title',
    subtitle: 'This is a subtitle',
    children: <Text variant="body">Modal content goes here.</Text>,
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <Text variant="body">This is a large modal with more space.</Text>
        <Text variant="body" className="mt-4">
          Useful for displaying more content or complex forms.
        </Text>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Small Modal',
    size: 'sm',
    children: <Text variant="body">A compact modal for simple messages.</Text>,
  },
};

export const NoCloseButton: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Persistent Modal',
    closeButton: false,
    children: <Text variant="body">This modal has no close button.</Text>,
  },
};
