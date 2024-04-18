import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<'button'> {
  children: string;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <>
      <button
        {...props}
        className={twMerge(`bg-cyan-500 hover:bg-cyan-400 text-sm font-bold py-2 px-4 rounded`, className)}
      >
        {children}
      </button>
    </>
  );
}
