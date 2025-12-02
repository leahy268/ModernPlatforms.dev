import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'tinacms/dist/client';

const POSTS_QUERY = `
  query PostConnection($last: Float) {
    postConnection(sort: "date", last: $last) {
      totalCount
      edges {
        cursor
        node {
          id
          title
          excerpt
          heroImg
          category
          date
          _sys {
            breadcrumbs
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const numPosts = parseInt(searchParams.get('numPosts') || '9', 10);
  const branch = searchParams.get('branch') || process.env.NEXT_PUBLIC_TINA_BRANCH || 'main';
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  const token = process.env.TINA_TOKEN;

  try {
    // Create a Tina client configured for the correct branch (following Tina custom queries pattern)
    const client = createClient({
      url: `https://content.tinajs.io/content/${clientId}/github/${branch}`,
      token: token || '',
      queries: () => ({}),
    });

    // Use client.request for inline queries as per Tina documentation
    const result = await client.request({
      query: POSTS_QUERY,
      variables: { last: numPosts },
    });

    console.log('Tina result:', JSON.stringify(result, null, 2));

    // The client.request returns { data: {...} }, so we need to check the structure
    const data = result?.data || result;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
