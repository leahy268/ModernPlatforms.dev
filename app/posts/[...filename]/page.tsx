import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import PostClientPage from "./client-page";
import { cookies } from "next/headers";

export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  const data = await client.queries.post({
    relativePath: `${params.filename.join("/")}.mdx`,
  },
  {
    fetchOptions: {
      headers: {
        'x-branch': cookies().get('tina-branch')?.value || process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
      }
    }
  }
);


  return (
    <Layout rawPageData={data}>
      <PostClientPage giscusConfig={{
        repo: process.env.COMMENTS_REPO,
        repoId: process.env.COMMENTS_REPO_ID,
        category: process.env.COMMENTS_CATEGORY,
        categoryId: process.env.COMMENT_CATEGORY_ID,
        datamapping: process.env.COMMENT_DATA_MAPPING,
      }} {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let posts = await client.queries.postConnection();
  const allPosts = posts;

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      after: posts.data.postConnection.pageInfo.endCursor,
    });
    allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
  }

  const params =
    allPosts.data?.postConnection.edges.map((edge) => ({
      filename: edge.node._sys.breadcrumbs,
    })) || [];

  return params;
}
