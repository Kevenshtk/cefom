import { forwardRef } from 'react';

export interface SelectOption {
  value: string | number;
  label: string | number;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className = '', options = [], children, ...props }, ref) => {
    const selectId = id || props.name;

    const baseSelectClass =
      'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary cursor-pointer';
    const errorSelectClass = 'border-red-500 focus:ring-red-500';
    const labelClass = 'block text-sm font-medium text-text-primary mb-1 mt-4';
    const errorClass = 'text-red-500 text-xs mt-1 block';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className={labelClass}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`${baseSelectClass} ${error ? errorSelectClass : ''} ${className}`}
          {...props}
        >
          {children || (
            <>
              <option value="" disabled>
                Selecione uma opção
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
        {error && <span className={errorClass}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
