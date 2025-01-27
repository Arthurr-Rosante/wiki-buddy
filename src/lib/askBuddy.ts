import { TextRazorAPIResponse } from "@/types.commons";
import axios from "axios";

const apiUrl = process.env.API_URL as string;
const apiKey = process.env.API_KEY as string;

export const askBuddy = async (text: string) => {
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
    return data;
  } catch (error) {
    console.error("Error making request to TextRazor:", error);
    throw new Error("Error: ", error as Error);
  }
};
