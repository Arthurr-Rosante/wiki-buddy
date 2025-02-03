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
      <section className="w-full sm:w-3/4 p-4 mt-4 flex flex-col bg-white/40 rounded-2xl shadow-lg backdrop-blur-sm min-h-screen sm:min-h-0 mx-0 sm:mx-auto">
        <h1 className="text-4xl sm:text-5xl text-left font-bold">
          ° {wikiData.title}
        </h1>
        <p className="ml-0 sm:ml-4 p-4 text-justify">{wikiData.extract}</p>
      </section>

      {textRazor.topics && textRazor.topics.length > 0 && (
        <Sidebar topics={textRazor.topics} />
      )}
    </>
  );
}
