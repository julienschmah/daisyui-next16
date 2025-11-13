import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../src/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'checkbox', 'radio'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'outline', 'error', 'success'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    label: 'Enter text',
    placeholder: 'Type something...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    label: 'Accept terms',
  },
};

export const Radio: Story = {
  args: {
    type: 'radio',
    label: 'Choose option',
  },
};
