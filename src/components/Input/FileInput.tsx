import { forwardRef, useEffect, useState } from 'react';

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, id, className = '', value, onChange, ...props }, ref) => {
    const inputId = id || props.name;
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const labelClass = 'block text-sm font-medium text-text-primary mb-1 mt-4';
    const errorClass = 'text-red-500 text-xs mt-1 block';

    useEffect(() => {
      if (!value) {
        const timer = setTimeout(() => setPreviewUrl(null), 0);
        return () => clearTimeout(timer);
      }

      if (value instanceof File) {
        const url = URL.createObjectURL(value);
        const timer = setTimeout(() => setPreviewUrl(url), 0);
        return () => {
          clearTimeout(timer);
          URL.revokeObjectURL(url);
        };
      } else if (typeof value === 'string') {
        const timer = setTimeout(() => setPreviewUrl(value), 0);
        return () => clearTimeout(timer);
      }
    }, [value]);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        )}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 mb-4 p-4 border border-dashed border-border rounded-lg bg-surface-2 transition-all hover:border-primary">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-surface border border-border flex items-center justify-center flex-shrink-0 group">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Foto"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <svg
                className="w-10 h-10 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <input
              ref={ref}
              type="file"
              id={inputId}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (onChange) onChange(file);
              }}
              className="hidden"
              {...props}
            />
            <label
              htmlFor={inputId}
              className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md px-4 py-2 shadow-sm bg-primary text-surface hover:opacity-90 focus:ring-primary cursor-pointer"
            >
              Selecionar Foto
            </label>
            <p className="text-xs text-text-secondary mt-2">
              PNG, JPG ou JPEG de até 5MB
            </p>
          </div>
        </div>
        {error && <span className={errorClass}>{error}</span>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
export default FileInput;
