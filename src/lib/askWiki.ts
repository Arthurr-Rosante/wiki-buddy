import { WikipediaPageData } from "@/types.commons";
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

    const sections = pageData.sections.map((section: any) => ({
      title: section.line,
      index: section.index,
    }));

    const imageResponse = await axios.get(endpoint, {
      params: {
        action: "query",
        titles: searchTerm,
        prop: "images",
        format: "json",
        formatversion: "2",
        origin: "*",
      },
    });

    const page = imageResponse.data.query.pages[0];
    const images = page?.images || [];
    const imageTitle = images.length > 0 ? images[0].title : null;
    let imageUrl: string | null = null;

    if (imageTitle) {
      const imageInfoResponse = await axios.get(endpoint, {
        params: {
          action: "query",
          titles: imageTitle,
          prop: "imageinfo",
          iiprop: "url",
          format: "json",
          formatversion: "2",
          origin: "*",
        },
      });
      const imageData = imageInfoResponse.data.query.pages[0];
      imageUrl = imageData?.imageinfo?.[0]?.url || null;
    }

    const fullContent = pageData.text["*"];
    const sectionContents = sections.map((section: any) => {
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
      imageUrl,
    };
  } catch (error) {
    console.error("Error fetching Wikipedia page data:", error);
    return null;
  }
};
