import React, { forwardRef, SelectHTMLAttributes } from "react";
import './Select.less';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: { value: string; label: string; }[];
  isLoading?: boolean;
}

const Select : React.FC<SelectProps> = forwardRef(({ options, isLoading, ...props }, ref: React.Ref<HTMLSelectElement>) => {
  return (
    <select className="select" {...props} ref={ref}>
      {!isLoading && options && options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
});

export default Select;
