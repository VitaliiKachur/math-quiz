import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    disabled: { control: 'boolean' }
  },
  args: {
    children: 'Start quiz',
    variant: 'primary',
    disabled: false
  }
};

export default meta;

export const Primary = {};

export const Secondary = {
  args: {
    children: 'Settings',
    variant: 'secondary'
  }
};

export const Disabled = {
  args: {
    children: 'Unavailable',
    disabled: true
  }
};
