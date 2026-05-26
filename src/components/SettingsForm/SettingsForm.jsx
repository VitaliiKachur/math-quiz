import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../Button/Button';
import './SettingsForm.css';

const schema = yup.object().shape({
  duration: yup
    .number()
    .typeError('Mae buty chyslom')
    .min(5, 'Minimum 5 sekund')
    .max(600, 'Maksymum 600 sekund')
    .required(),
  difficulty: yup
    .string()
    .required(),
  operators: yup
    .array()
    .of(yup.string())
    .min(1, 'Oberit khocha b odnu operatsiiu!')
    .required()
});

/**
 * Form for configuring quiz duration, difficulty and math operators.
 *
 * @param {object} props
 * @param {{duration:number,difficulty:string,operators:string[]}} props.currentSettings Current quiz settings.
 * @param {Function} props.onSave Saves validated settings.
 * @param {Function} [props.onCancel] Optional cancel handler.
 */
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
      <h3>Nalashtuvannia hry</h3>

      <div className="form-group">
        <label>Tryvalist (sek):</label>
        <input {...register('duration')} type="number" />
        {errors.duration && <span className="error">{errors.duration.message}</span>}
      </div>

      <div className="form-group">
        <label>Diapazon chysel (riven):</label>
        <select {...register('difficulty')}>
          <option value="easy">Novachok (chysla do 10)</option>
          <option value="medium">Uchen (chysla do 20)</option>
          <option value="hard">Student (chysla do 50 + droby)</option>
          <option value="expert">Profesor (chysla do 100 + droby)</option>
        </select>
      </div>

      <div className="form-group">
        <label style={{ marginBottom: '10px' }}>Typy zavdan:</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" value="+" {...register('operators')} />
            <span>Dodavannia (+)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" value="-" {...register('operators')} />
            <span>Vidnimannia (-)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" value="*" {...register('operators')} />
            <span>Mnozhennia (*)</span>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" value="/" {...register('operators')} />
            <span>Dilennia (:)</span>
          </label>
        </div>
        {errors.operators && <span className="error">{errors.operators.message}</span>}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button type="submit">Zberehty</Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Skasuvaty</Button>}
      </div>
    </form>
  );
};

export default SettingsForm;
