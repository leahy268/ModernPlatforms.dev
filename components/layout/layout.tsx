import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { Analytics } from '@vercel/analytics/react'
import client from "../../tina/__generated__/client";
import Header from "../nav/header";
import Footer from "../nav/footer";
import { cn } from "../../lib/utils";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Analytics />
      <Header />
      <main
      
        className={cn(
          "font-sans flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col"
        )}
      >
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
