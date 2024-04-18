import { ComponentProps, ReactNode } from 'react';

interface ContainerProps extends ComponentProps<'main'> {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <>
      <main className="w-full max-w-4xl mx-auto p-5 flex flex-col gap-5">{children}</main>
    </>
  );
}
