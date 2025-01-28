"use client";

import { useEffect, useState } from "react";
import { ResponseObject } from "@/types.commons";
import axios from "axios";
import Sidebar from "./Sidebar";

interface FeedProps {
  buddyResponse: ResponseObject | null;
}

export function Feed({ buddyResponse }: FeedProps) {
  const [response, setResponse] = useState<ResponseObject | null>(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchWikipedia = async (pageTitle: string) => {
      try {
        const response = await axios.get(
          `/api/wikipedia?pageTitle=${pageTitle}`
        );
        console.log(response.data);
        setContent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (buddyResponse) {
      setResponse(buddyResponse);
      fetchWikipedia(buddyResponse.entities[0].entityId);
    }
  }, [buddyResponse]);

  if (!buddyResponse) return null;

  return (
    <section className="w-3/4 p-4 mt-4 flex flex-col items-center">
      {content && (
        <>
          <div className="w-full p-2">
            <h1 className="text-start text-4xl font-bold tracking-wide">
              1° {(content as any).title}
            </h1>
            <div>{/* content goes here.... */}</div>
          </div>

          <Sidebar />
        </>
      )}
    </section>
  );
}
