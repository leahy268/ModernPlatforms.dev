import client from "@/tina/__generated__/client";
import { PostConnection, PostConnectionEdges, Post } from "@/tina/__generated__/types";


export default async function TopPosts({ numPosts = 9, branch }: { numPosts?: number; branch?: string }) {
  console.log("⚡ Fetching TopPosts with numPosts:", numPosts);

  const fetchOptions = branch ? {
    fetchOptions: {
      headers: {
        'x-branch': branch,
      }
    }
  } : undefined;

  let posts = await client.queries.postConnection({
    sort: "date",
    last: numPosts, 
  }, fetchOptions);

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
