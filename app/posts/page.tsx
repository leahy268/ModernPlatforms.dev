import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";
import { PostConnection, PostConnectionEdges, Post } from "@/tina/__generated__/types";

export default async function PostsPage() {
  let posts = await client.queries.postConnection({
    sort: "date",
  });
  const allPosts = posts;

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      sort: "date",
      after: posts.data.postConnection.pageInfo.endCursor,
    });
    allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
  }

  allPosts.data.postConnection.edges.reverse();

  return (
    <Layout rawPageData={allPosts.data}>
      <PostsClientPage {...allPosts} />
    </Layout>
  );
}

export async function TopPosts({ numPosts = 4 }: { numPosts?: number }) {
  console.log("⚡ Fetching TopPosts with numPosts:", numPosts);

  let posts = await client.queries.postConnection({
    sort: "date",
    last: numPosts, 
  });

  console.log("✅ Fetched posts count:", posts.data?.postConnection.edges.length);

  // ✅ Ensure `edges` follows the expected type structure
  const allPosts: PostConnectionEdges[] =
    (posts.data?.postConnection.edges.slice(0, numPosts) || []).map((edge) => ({
      __typename: "PostConnectionEdges", // ✅ Explicitly set typename
      cursor: edge.cursor,
      node: {
        __typename: "Post", // ✅ Explicitly set typename
        ...edge.node, // ✅ Spread existing properties
        _values: {}, // ✅ Add missing _values field (TinaCMS expects this)
      } as Post, // ✅ Ensure correct casting
    }));

  console.log("📢 Final post count (after slice):", allPosts.length);

  const finalData: PostConnection = {
    __typename: "PostConnection", // ✅ Explicitly set typename
    totalCount: posts.data?.postConnection.totalCount || 0,
    pageInfo: {
      __typename: "PageInfo", // ✅ Explicitly set typename
      hasPreviousPage: posts.data?.postConnection.pageInfo.hasPreviousPage || false,
      hasNextPage: posts.data?.postConnection.pageInfo.hasNextPage || false,
      startCursor: posts.data?.postConnection.pageInfo.startCursor || "",
      endCursor: posts.data?.postConnection.pageInfo.endCursor || "",
    },
    edges: allPosts, // ✅ Ensure correct type structure
  };

  return finalData;
}
