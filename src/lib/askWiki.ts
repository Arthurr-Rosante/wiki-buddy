import { WikipediaAPIResponse } from "@/types.commons";
import cleanHtmlContent from "@/utils/cleanHtml";
import axios from "axios";

export const askWiki = async (searchTerm: string) => {
  const endpoint = "https://pt.wikipedia.org/w/api.php";

  try {
    const response = await axios.get(endpoint, {
      params: {
        action: "query",
        titles: searchTerm,
        prop: "extracts",
        exintro: true,
        explaintext: true,
        format: "json",
      },
    });

    const pageData = response.data.query.pages;
    const pageId = Object.keys(pageData)[0];

    if (!pageData[pageId]) {
      throw new Error(`Page not found: ${searchTerm}`);
    }

    const title = pageData[pageId].title;
    const extract = pageData[pageId].extract;

    return {
      title,
      extract,
    };
  } catch (error) {
    console.error("Error fetching Wikipedia page data:", error as Error);
    return null;
  }
};
