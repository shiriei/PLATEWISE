import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl text-brand-text uppercase leading-tight">
      {children}
    </h2>
  );
}
