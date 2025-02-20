"use client";

import { useEffect, useState } from "react";
import { PostConnection } from "@/tina/__generated__/types";
import { TopPosts } from "../../app/posts/page";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";

export default function LatestPosts({ numPosts = 4 }: { numPosts?: number }) {
  const [data, setData] = useState<PostConnection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log("📢 Fetching latest posts...");
        const fetchedData = await TopPosts({ numPosts });

        if (fetchedData) {
          setData(fetchedData); // ✅ Now setData gets valid PostConnection data
        }
      } catch (error) {
        console.error("❌ Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [numPosts]);

  if (loading) return <p>Loading latest posts...</p>;
  if (!data?.edges || data.edges.length === 0) return <p>No posts found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.edges.map((post, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow flex items-start gap-4">
            {/* Small Hero Image (Top Left) */}
            {post.node.heroImg && (
              <img
                src={post.node.heroImg}
                alt={post.node.title}
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
  
            {/* Post Details */}
            <div className="flex-1">
              {/* Category Label */}
              <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
                {post.node.category || "Uncategorized"}
              </div>
  
              {/* Title */}
              <h4 className="text-lg font-semibold mt-2">{post.node.title}</h4>
  
              {/* Excerpt (Fixed: Use TinaMarkdown for rich text) */}
              {post.node.excerpt && (
                <div className="text-gray-600 text-sm mt-2 line-clamp-5">
                  <TinaMarkdown content={post.node.excerpt} />
                </div>
              )}
  
              {/* Read More Link */}
              <a
                href={`/posts/${post.node._sys.filename}`}
                className="text-blue-500 mt-2 inline-block"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

// TinaCMS block schema for Latest Posts
export const latestPostsBlockSchema: Template = {
  name: "LatestPosts",
  label: "Latest Posts",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      heading: "Latest Posts",
      numPosts: 5,
    },
  },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "number",
      label: "Number of Posts",
      name: "numPosts",
      description: "Specify how many recent posts to display.",
    },
  ],
};
