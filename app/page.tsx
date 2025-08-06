import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...filename]/client-page";
import { cookies } from "next/headers";
export default async function Home() {
  const cookieStore = await cookies();
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  },
    {
      fetchOptions: {
        headers: {
          'x-branch': cookieStore.get('x-branch')?.value || process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
        }
      }
    });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
