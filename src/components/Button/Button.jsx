import styles from './Button.module.css'; 

/**
 * Reusable action button for quiz commands and forms.
 *
 * @param {object} props
 * @param {Function} [props.onClick] Click handler.
 * @param {React.ReactNode} props.children Button label or content.
 * @param {'primary'|'secondary'} [props.variant='primary'] Visual style.
 * @param {'button'|'submit'|'reset'} [props.type='button'] Native button type.
 * @param {boolean} [props.disabled=false] Disables interaction.
 */
const Button = ({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) => {
  const variantClass = styles[`btn-${variant}`] || styles['btn-primary'];

  return (
    <button 
      type={type}
      className={`${styles.btn} ${variantClass} ${className}`.trim()} 
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
