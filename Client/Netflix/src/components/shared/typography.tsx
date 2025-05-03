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
    | "text-4xl"
    | "text-5xl";
  weight?: "font-light" | "font-normal" | "font-bold" | "font-semibold";
  color?:
    | "text-white"
    | "text-gray-300"
    | "text-gray-400"
    | "text-gray-500"
    | "text-red-500"
    | "text-green-800"
    | "text-red-500";
  spacing?: "tracking-tight" | "tracking-normal" | "tracking-wide";
};

const Typography = ({
  children,
  className = "",
  size = "text-md",
  weight = "font-normal",
  color = "text-white",
  spacing = "tracking-normal",
}: TypographyProps) => {
  return (
    <p className={`${size} ${weight} ${color} ${spacing} ${className}`}>
      {children}
    </p>
  );
};

export default Typography;
