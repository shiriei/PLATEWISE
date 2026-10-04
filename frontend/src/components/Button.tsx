import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', disabled, ...props }: ButtonProps) {
  const baseClasses = "font-inter font-bold uppercase tracking-wider py-4 px-8 border-4 border-brand-text transition-all inline-flex items-center justify-center";
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed transform-none shadow-none" : "cursor-pointer active:translate-y-1 active:shadow-none";

  const variants = {
    primary: `bg-brand-red text-white ${!disabled ? 'shadow-[4px_4px_0px_0px_rgba(16,24,23,1)] hover:shadow-[6px_6px_0px_0px_rgba(16,24,23,1)] hover:-translate-y-0.5' : ''}`,
    secondary: `bg-brand-yellow text-brand-text ${!disabled ? 'shadow-[4px_4px_0px_0px_rgba(16,24,23,1)] hover:shadow-[6px_6px_0px_0px_rgba(16,24,23,1)] hover:-translate-y-0.5' : ''}`
  };

  return (
    <button disabled={disabled} className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
