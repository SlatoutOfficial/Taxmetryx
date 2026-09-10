import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
