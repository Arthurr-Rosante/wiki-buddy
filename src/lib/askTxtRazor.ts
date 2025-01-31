import {
  AskTxtRazorResponse,
  Entity,
  ResponseObject,
  TextRazorAPIResponse,
} from "@/types.commons";
import axios from "axios";
import { validateEntities } from "./validateEntities";

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
        extractors: "entities,topics,relations,senses",
      }).toString(),
    });

    const data: TextRazorAPIResponse = response.data;
    const entitiesList: ResponseObject["entities"] = data.response.entities;
    const topicsList: ResponseObject["topics"] = data.response.topics;

    // only the most related entities | the first 25 matching topics
    const validEntities = validateEntities(entitiesList)
    const validTopics = topicsList
      ?.filter((topic) => topic.id < 25)
      .filter((topic) => !topic.wikiLink.includes("/Category:"));

    return {
      data,
      entities: validEntities,
      topics: validTopics,
    } as AskTxtRazorResponse;
  } catch (error) {
    console.error("Error making request to TextRazor:", error);
    throw new Error("Error: ", error as Error);
  }
};
