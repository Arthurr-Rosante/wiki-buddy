"use client";

import { FullResponse } from "@/types.commons";
import Sidebar from "./Sidebar";
interface FeedProps {
  buddyResponse: FullResponse | null;
}

export function Feed({ buddyResponse }: FeedProps) {
  if (!buddyResponse) return null;

  const { textRazor, wikiData } = buddyResponse;

  return (
    <>
      <section className="w-3/4 p-4 mt-4 flex flex-col bg-white/40 rounded-2xl shadow-lg backdrop-blur-sm">
        <h1 className="text-5xl text-left font-bold">° {wikiData.title}</h1>
        <p className="ml-4 p-4 text-justify">{wikiData.extract}</p>
      </section>
      {/* {textRazor.response.topics && (
        <Sidebar content={textRazor.response.topics} />
      )} */}
    </>
  );
}

// const [response, setResponse] = useState<ResponseObject | null>(null);
// const [content, setContent] = useState(null);

// useEffect(() => {
//   const fetchWikipedia = async (pageTitle: string) => {
//     try {
//       const response = await axios.get(
//         `/api/wikipedia?pageTitle=${pageTitle}`
//       );
//       console.log(response.data);
//       setContent(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (buddyResponse) {
//     setResponse(buddyResponse);
//     fetchWikipedia(buddyResponse.entities[0].entityId);
//   }
// }, [buddyResponse]);
