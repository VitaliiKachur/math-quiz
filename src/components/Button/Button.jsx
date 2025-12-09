import styles from './Button.module.css'; 

const Button = ({ onClick, children, variant = 'primary', type = 'button' }) => {
  return (
    <button 
      type={type}
      className={`${styles.btn} ${styles[variant]}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;