import type { ButtonProps } from './types';

export function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md px-4 py-2 shadow-sm";
  
  const variantClasses = {
    primary: "bg-primary text-surface hover:opacity-90 focus:ring-primary",
    secondary: "bg-surface-2 text-text-primary border border-border hover:bg-surface focus:ring-primary"
  };

  return (
    <button 
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
