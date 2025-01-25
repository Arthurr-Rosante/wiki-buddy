"use client";
import { useEffect, useState } from "react";
import { ResponseObject } from "@/types.commons";

interface FeedProps {
  buddyResponse: ResponseObject | null;
}

export function Feed({ buddyResponse }: FeedProps) {
  const [response, setResponse] = useState<ResponseObject | null>(
    buddyResponse
  );
  const [content, setContent] = useState({
    label: "",
    link: "",
  });

  useEffect(() => {
    setResponse(buddyResponse);
    console.log(buddyResponse);

    if (buddyResponse?.entities) {
      setContent({
        label: buddyResponse.entities[0].entityId,
        link: buddyResponse.entities[0].wikiLink || "",
      });
      console.log(buddyResponse.entities[0].wikiLink);
    }
  }, [buddyResponse]);

  if (!buddyResponse) return null;

  return (
    <section className="w-3/4 p-4 mt-4 flex flex-col items-center">
      <a
        className="hover:underline hover:text-blue-500"
        target="_blank"
        href={content.link as string}
      >
        {content.label}
      </a>
    </section>
  );
}
