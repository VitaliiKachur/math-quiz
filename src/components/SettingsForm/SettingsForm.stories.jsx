import SettingsForm from './SettingsForm';

const meta = {
  title: 'Components/SettingsForm',
  component: SettingsForm,
  tags: ['autodocs'],
  argTypes: {
    currentSettings: { control: 'object' },
    onSave: { action: 'saved' },
    onCancel: { action: 'cancelled' }
  },
  args: {
    currentSettings: {
      duration: 30,
      difficulty: 'easy',
      operators: ['+', '-']
    }
  }
};

export default meta;

export const EasyAddition = {};

export const TimedMixedPractice = {
  args: {
    currentSettings: {
      duration: 60,
      difficulty: 'medium',
      operators: ['+', '-', '*']
    }
  }
};

export const ExpertMode = {
  args: {
    currentSettings: {
      duration: 120,
      difficulty: 'expert',
      operators: ['+', '-', '*', '/']
    }
  }
};
