"use client";

import { ComponentProps } from "react";
import React from 'react';


type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  

  return (
    <button
      {...props}
      className={`btn-primary btn ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
}