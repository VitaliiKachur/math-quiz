import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../Button/Button';
import './SettingsForm.css';

const schema = yup.object().shape({
  duration: yup
    .number()
    .typeError('Має бути числом')
    .min(5, 'Мінімум 5 секунд')
    .max(600, 'Максимум 600 секунд')
    .required(),
  difficulty: yup
    .string()
    .required(),
  operators: yup
    .array()
    .of(yup.string())
    .min(1, 'Оберіть хоча б одну операцію!') 
    .required()
});

const SettingsForm = ({ currentSettings, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...currentSettings,
      operators: currentSettings.operators || ['+', '-']
    },
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
      <h3>⚙️ Налаштування гри</h3>
      
      <div className="form-group">
        <label>Тривалість (сек):</label>
        <input {...register('duration')} type="number" />
        {errors.duration && <span className="error">{errors.duration.message}</span>}
      </div>

      <div className="form-group">
        <label>Діапазон чисел (Рівень):</label>
        <select {...register('difficulty')}>
          <option value="easy">Новачок (числа до 10)</option>
          <option value="medium">Учень (числа до 20)</option>
          <option value="hard">Студент (числа до 50 + дроби)</option>
          <option value="expert">Професор (числа до 100 + дроби)</option>
        </select>
      </div>

      <div className="form-group">
        <label style={{ marginBottom: '10px' }}>Типи завдань:</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" value="+" {...register('operators')} /> 
            <span>Додавання (+)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" value="-" {...register('operators')} /> 
            <span>Віднімання (-)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" value="*" {...register('operators')} /> 
            <span>Множення (*)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" value="/" {...register('operators')} /> 
            <span>Ділення (:)</span>
          </label>
        </div>
        {errors.operators && <span className="error">{errors.operators.message}</span>}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button type="submit">Зберегти</Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Скасувати</Button>}
      </div>
    </form>
  );
};

export default SettingsForm;