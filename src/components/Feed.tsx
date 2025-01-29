"use client";

import { useEffect, useState } from "react";
import { FullResponse } from "@/types.commons";
import axios from "axios";
import Sidebar from "./Sidebar";

interface FeedProps {
  buddyResponse: FullResponse | null;
}

export function Feed({ buddyResponse }: FeedProps) {
  if (!buddyResponse) return null;

  return (
    <section className="w-3/4 p-4 mt-4 flex flex-col items-center"></section>
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
