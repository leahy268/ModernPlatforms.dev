"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import { cn } from "../../lib/utils";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import NavItems from "./nav-items";
import { useLayout } from "../layout/layout-context";

const headerColor = {
  default: "bg-[#202938] text-white",
  primary: "bg-[#202938] text-white",
};

export default function Header() {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings.header;

  const headerColorCss =
    theme?.darkMode === "primary" ? headerColor.primary : headerColor.default;

  return (
    <div className={cn("shadow-md", headerColorCss)}>
      <Container size="small" className="py-2 relative max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <Icon
                tinaField={tinaField(header, "icon")}
                parentColor={header.color}
                data={{
                  name: header.icon.name,
                  color: header.icon.color,
                  style: header.icon.style,
                }}
                className="h-8 w-auto text-white"
              />
              <span data-tina-field={tinaField(header, "name")}>
                {header.name}
              </span>
            </Link>
          </h4>
          <NavItems navs={header.nav} />
        </div>
      </Container>
    </div>
  );
}
