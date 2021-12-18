import './Button.less';

export type ButtonProps = {
  onClick?: () => void;
  isPrimary?: boolean;
  isDisabled?: boolean;
}

const Button : React.FC<ButtonProps> = ({ children, onClick, isDisabled, isPrimary }) => {
  const primaryClass = isPrimary ? 'primary' : '';
  return (
    <button
      onClick={onClick}
      className={`button ${primaryClass}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
