import React from "react";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  size?:
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-4xl";
  weight?: "font-light" | "font-normal" | "font-bold";
  color?:
    | "text-white"
    | "text-gray-300"
    | "text-gray-500"
    | "text-red-500"
    | "text-green-800"
    | "text-red-500";
  spacing?: "tracking-tight" | "tracking-normal" | "tracking-wide";
};

const Typography: React.FC<TypographyProps> = ({
  children,
  className = "",
  size = "text-md",
  weight = "font-normal",
  color = "text-white",
  spacing = "tracking-normal",
}) => {
  return (
    <p className={`${size} ${weight} ${color} ${spacing} ${className}`}>
      {children}
    </p>
  );
};

export default Typography;
