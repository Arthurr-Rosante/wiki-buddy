import { askBuddy } from "@/lib/askBuddy";

export const POST = async (req: Request) => {
  const { text } = await req.json();
  try {
    const response = await askBuddy(text);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error making request to TextRazor:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request to TextRazor" }),
      { status: 500 }
    );
  }
};

// const response = await axios({
//   method: "POST",
//   url: apiUrl,
//   headers: {
//     "X-TextRazor-Key": apiKey,
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Accept-encoding": "gzip",
//   },
//   data: new URLSearchParams({
//     text,
//     extractors: "entities,topics",
//   }).toString(),
// });

// const data: TextRazorAPIResponse = response.data;
