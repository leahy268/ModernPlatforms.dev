import { cookies } from "next/headers";

export async function getTinaFetchOptions() {
  const cookieStore = cookies();
  return {
    fetchOptions: {
      headers: {
        "x-branch":
          cookieStore.get("x-branch")?.value ||
          process.env.NEXT_PUBLIC_TINA_BRANCH ||
          "main",
      },
    },
  } as const;
}
