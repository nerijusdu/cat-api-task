import React, { forwardRef, SelectHTMLAttributes } from "react";
import './Select.less';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: { value: string; label: string; }[];
  label?: string;
  error?: string;
}

const Select : React.FC<SelectProps> = forwardRef(({ options, label, error, ...props }, ref: React.Ref<HTMLSelectElement>) => {
  return (
    <div className="select-wrapper">
      {label && <label className="label">{label}</label>}
      <select className="select" {...props} ref={ref}>
        {options && options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
});

export default Select;
