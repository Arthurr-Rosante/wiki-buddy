import { Section, WikipediaPageData, WikiSection } from "@/types.commons";
import axios from "axios";

export const askWiki = async (
  searchTerm: string
): Promise<WikipediaPageData | null> => {
  const endpoint = "https://en.wikipedia.org/w/api.php";

  try {
    const pageResponse = await axios.get(endpoint, {
      params: {
        action: "parse",
        page: searchTerm,
        prop: "sections|text",
        format: "json",
        origin: "*",
      },
    });

    const pageData = pageResponse.data.parse;
    if (!pageData) {
      console.warn(`No data found for: ${searchTerm}`);
      return null;
    }

    const sections = pageData.sections.map((section: WikiSection) => ({
      title: section.line,
      index: section.index,
    }));

    const fullContent = pageData.text["*"];
    const sectionContents = sections.map((section: Section) => {
      const regex = new RegExp(
        `<h[1-6][^>]*>${section.title}</h[1-6]>((.|\\n)*?)(<h[1-6]|$)`,
        "i"
      );
      const match = fullContent.match(regex);
      return {
        title: section.title,
        content: match ? match[1].replace(/<[^>]*>/g, "").trim() : "",
      };
    });

    return {
      title: pageData.title,
      sections: sectionContents,
    };
  } catch (error) {
    console.error("Error fetching Wikipedia page data:", error);
    return null;
  }
};
