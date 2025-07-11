import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import PostsClientPage from "./client-page";
import { cookies } from "next/headers";

export default async function PostsPage() {
  const cookieStore = await cookies();
  let posts = await client.queries.postConnection({
    sort: "date",
    },
    {
      fetchOptions: {
        headers: {
          'x-branch': cookieStore.get('x-branch')?.value || process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
        }
      }
    }
);
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
