import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-black max-w-6xl size-full mx-auto">
      {children}
    </div>
  );
};

export default Container;
