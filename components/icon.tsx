"use client";
import * as BoxIcons from "react-icons/bi";
import React from "react";
import { useLayout } from "./layout/layout-context";

export const IconOptions = {
  SysAdmin: (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-server"
      {...props} // Allow passing props like `className`
    >
      <title>SysAdminTipsandTricks</title>
      <desc>Lots of tips for the modern sysadmin</desc>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
      <line x1="6" x2="6.01" y1="6" y2="6"></line>
      <line x1="6" x2="6.01" y1="18" y2="18"></line>
    </svg>
  ),

  ModernPlatforms: (props) => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Pass props for styling
    >
      <title>ModernPlatforms</title>
      <desc>A Dev&apos;s guide to modern platforms</desc>
      <rect width="100" height="100" rx="15" fill="none" />
      {/* Cloud (Shifted Left by 5 units) */}
      <path
        d="M25 60 C15 60, 15 40, 35 40 
          C40 25, 65 25, 70 40 
          C85 40, 85 60, 70 60 
          Z"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        />
       {/* Stacked Platform Layers  */}
      <rect x="30" y="65" width="40" height="6" fill="white" rx="2"/>
      <rect x="27" y="73" width="46" height="6" fill="white" rx="2"/>
      <rect x="24" y="81" width="52" height="6" fill="white" rx="2"/>

   {/* Subtle Code Brackets  */}
  <path d="M20 70 L15 75 L20 80" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  <path d="M80 70 L85 75 L80 80" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),

  ...BoxIcons, // Ensure BoxIcons is defined and contains valid SVG components
};


const iconColorClass: {
  [name: string]: { regular: string; circle: string };
} = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50",
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50",
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50",
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50",
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50",
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50",
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50",
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50",
  },
};

const iconSizeClass = {
  xs: "w-6 h-6 flex-shrink-0",
  small: "w-8 h-8 flex-shrink-0",
  medium: "w-12 h-12 flex-shrink-0",
  large: "w-14 h-14 flex-shrink-0",
  xl: "w-16 h-16 flex-shrink-0",
  custom: "",
};

export const Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField = "",
}) => {
  const { theme } = useLayout();

  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return null;
  }

  const { name, color, size = "medium", style = "regular" } = data;

  const IconSVG = IconOptions[name];

  const iconSizeClasses =
    typeof size === "string"
      ? iconSizeClass[size]
      : iconSizeClass[Object.keys(iconSizeClass)[size]];

  const iconColor = color
    ? color === "primary"
      ? theme.color
      : color
    : theme.color;

  if (style == "circle") {
    return (
      <div
        data-tina-field={tinaField}
        className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  } else {
    const iconColorClasses =
      iconColorClass[
        parentColor === "primary" &&
        (iconColor === theme.color || iconColor === "primary")
          ? "white"
          : iconColor
      ].regular;
    return (
      <IconSVG
        data-tina-field={tinaField}
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
      />
    );
  }
};
