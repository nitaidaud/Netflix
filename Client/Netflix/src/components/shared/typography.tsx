import React from "react";

type ResponsiveSize = Partial<{
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  ["2xl"]: string;
}>;

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
<<<<<<< HEAD
  size?:
    | "text-xs"
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-4xl"
    | "text-5xl";
=======
  size?: string; 
  responsiveSize?: ResponsiveSize; 
>>>>>>> 7799e722d256f842079fb10e0a2a710ec40e29a9
  weight?: "font-light" | "font-normal" | "font-bold" | "font-semibold";
  color?:
    | "text-white"
    | "text-gray-300"
    | "text-gray-400"
    | "text-gray-500"
    | "text-red-500"
<<<<<<< HEAD
    | "text-green-800"
    | "text-zinc-400"
    | "text-red-500";
=======
    | "text-green-800";
>>>>>>> 7799e722d256f842079fb10e0a2a710ec40e29a9
  spacing?: "tracking-tight" | "tracking-normal" | "tracking-wide";
};

const Typography = ({
  children,
  className = "",
  size,
  responsiveSize,
  weight = "font-normal",
  color = "text-white",
  spacing = "tracking-normal",
}: TypographyProps) => {
  const responsiveClassNames = responsiveSize
    ? Object.entries(responsiveSize)
        .map(([breakpoint, value]) =>
          breakpoint === "base" ? value : `${breakpoint}:${value}`
        )
        .join(" ")
    : "";

  return (
    <p
      className={`${
        size ?? ""
      } ${responsiveClassNames} ${weight} ${color} ${spacing} ${className}`}
    >
      {children}
    </p>
  );
};

export default Typography;
