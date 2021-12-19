import './Button.less';

export type ButtonProps = {
  onClick?: () => void;
  isPrimary?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit';
}

const Button : React.FC<ButtonProps> = ({ children, onClick, isDisabled, isPrimary, type }) => {
  const primaryClass = isPrimary ? 'primary' : '';
  return (
    <button
      onClick={onClick}
      className={`button ${primaryClass}`}
      disabled={isDisabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
