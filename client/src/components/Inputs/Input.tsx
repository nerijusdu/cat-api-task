import './Input.less';
import React, { forwardRef, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { };

const Input : React.FC<InputProps> = forwardRef((props, ref: React.Ref<HTMLInputElement>) => {
  return (
    <input className="input" {...props} ref={ref} />
  );
});

export default Input;
