import { askTxtRazor } from "@/lib/askTxtRazor";
import { askWiki } from "@/lib/askWiki";

export const POST = async (req: Request) => {
  const { text } = await req.json();
  try {
    const textRazor = await askTxtRazor(text);
    const mostRelevantEntity = textRazor.entities[0].entityId;
    const lang = textRazor.data.response.language;

    const wikiData = await askWiki(mostRelevantEntity, lang);

    return new Response(JSON.stringify({ textRazor, wikiData }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error making request to TextRazor:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request to TextRazor" }),
      { status: 500 }
    );
  }
};
