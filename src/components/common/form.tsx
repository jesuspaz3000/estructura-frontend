"use client"
import React from "react";
import useDaAsyncTask from "@da-shui/hooks/callbacks/useAsyncTask";

interface DaFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DaForm = ({children, className, onSubmit}: DaFormProps) => {
  
  function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {} = useDaAsyncTask(() => {
      onSubmit?.(e);
    })
  }
  
  return (
    <form className={className} onSubmit={HandleSubmit}>
      {children}
    </form>
  )
}

export default DaForm;