"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { useLayout } from "../layout/layout-context";

export default function NavItems({ navs }: { navs: any }) {
  const currentPath = usePathname();
  const { theme } = useLayout();

  return (
    <ul className="flex gap-3 sm:gap-5 tracking-wide">
      {navs.map((item) => (
        <li key={item.href}>
          <Link
            data-tina-field={tinaField(item, "label")}
            href={`/${item.href}`}
            className={`text-white text-sm sm:text-base font-medium px-2 py-1 
                        transition duration-150 ease-out hover:opacity-80
                        ${currentPath === `/${item.href}` ? "border-b-2 border-blue-300 pb-1" : ""}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
