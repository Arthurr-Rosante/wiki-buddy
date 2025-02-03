import {
  AskTxtRazorResponse,
  ResponseObject,
  TextRazorAPIResponse,
} from "@/types.commons";
import validateEntities from "@/utils/validateEntities";
import axios from "axios";

const apiUrl = process.env.API_URL as string;
const apiKey = process.env.API_KEY as string;

export const askTxtRazor = async (text: string) => {
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
    const entitiesList: ResponseObject["entities"] = data.response.entities;
    const topicsList: ResponseObject["topics"] = data.response.topics;
    data.response.language =
      data.response.language === "eng"
        ? "en"
        : data.response.language === "por"
        ? "pt"
        : data.response.language;

    const validEntities = validateEntities(entitiesList);
    const validTopics = topicsList
      ?.filter((topic) => !topic.wikiLink.includes("/Category:"))
      .map((topic) => ({
        ...topic,
        wikiLink: `https://en.wikipedia.org/wiki/${topic.label}`,
      }));

    return {
      data,
      entities: entitiesList.length > 5 ? validEntities : entitiesList, //check here
      topics: validTopics,
    } as AskTxtRazorResponse;
  } catch (error) {
    console.error("Error making request to TextRazor:", error);
    throw new Error("Error: ", error as Error);
  }
};
