import { askWiki } from "@/lib/askWiki";

export const GET = async (req: Request) => {
  const pageTitle = new URL(req.url).searchParams.get("pageTitle");

  if (!pageTitle || typeof pageTitle !== "string") {
    return new Response("Error: The 'pageTitle' parameter is required.", {
      status: 400,
    });
  }
  try {
    const response = await askWiki(pageTitle);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error making request to Wikipedia API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request to Wikipedia API" }),
      { status: 500 }
    );
  }
};
