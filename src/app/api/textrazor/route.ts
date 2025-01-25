import axios from "axios";
import { TextRazorAPIResponse } from "@/types.commons";

const apiUrl = process.env.API_URL as string;
const apiKey = process.env.API_KEY as string;
export const POST = async (req: Request) => {
  const { text } = await req.json();

  try {
    const response = await axios({
      method: "POST",
      url: apiUrl,
      headers: {
        "X-TextRazor-Key": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-encoding": "gzip",
      },
      data: new URLSearchParams({
        text,
        extractors: "entities,topics",
      }).toString(),
    });

    const data: TextRazorAPIResponse = response.data;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error making request to TextRazor:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request to TextRazor" }),
      { status: 500 }
    );
  }
};
