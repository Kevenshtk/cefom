import type { ReactNode } from "react";

export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};
