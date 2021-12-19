import './Input.less';
import React, { forwardRef, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input : React.FC<InputProps> = forwardRef(({ label, error, ...props }, ref: React.Ref<HTMLInputElement>) => {
  return (
    <div className="input-wrapper">
      {label && <label className="label">{label}</label>}
      <input className="input" {...props} ref={ref} />
      {error && <span className="error">{error}</span>}
    </div>
  );
});

export default Input;
