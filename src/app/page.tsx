"use client";

import { Form } from "@/components/Form";
import { Feed } from "@/components/Feed";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FullResponse,
  ResponseObject,
  TextRazorAPIResponse,
  WikipediaPageData,
} from "@/types.commons";
import { Loading } from "@/components/Loading";
import axios from "axios";

export default function Home() {
  const [response, setResponse] = useState<FullResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const txtRazorResponse = await axios.post(
        "/api/textrazor",
        { text: prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const txtRazorData: TextRazorAPIResponse = txtRazorResponse.data;

      let pageTitle = txtRazorData.response.entities[0].entityId;
      // if(txtRazorData.response) {
      //logic to fetch next topic if first doesn't have wikilink;
      // }

      const wikiResponse = await axios.get(
        `/api/wikipedia?pageTitle=${pageTitle}`
      );
      const wikiData: WikipediaPageData = wikiResponse.data;

      const response = {
        wikiData,
        txtRazorData,
      };

      setResponse(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <main className="flex flex-col gap-y-5 items-center justify-center min-h-screen relative max-w-5xl mx-auto">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto flex flex-col space-y-6 z-10">
        <h1 className="text-center text-4xl font-bold">
          Want to search for a Topic? <br />
          <span className="text-4xl">
            Leave it to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient">
              Wiki Buddy
            </span>
          </span>
        </h1>
        <Form submitHandler={handleSubmit} />
      </div>
      {isLoading ? <Loading /> : <Feed buddyResponse={response} />}
    </main>
  );
}
