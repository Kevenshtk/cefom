import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || props.name;

    const baseInputClass =
      'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-surface-2 disabled:text-text-secondary';
    const errorInputClass = 'border-red-500 focus:ring-red-500';
    const labelClass = 'block text-sm font-medium text-text-primary mb-1 mt-4';
    const errorClass = 'text-red-500 text-xs mt-1 block';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseInputClass} ${error ? errorInputClass : ''} ${className}`}
          {...props}
        />
        {error && <span className={errorClass}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
