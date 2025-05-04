import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center justify-center p-4 bg-black max-w-7xl size-full mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
