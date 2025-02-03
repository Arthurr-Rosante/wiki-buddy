"use client";

import { Form } from "@/components/Form";
import { Feed } from "@/components/Feed";
import { Dispatch, SetStateAction, useState } from "react";
import { Loading } from "@/components/Loading";
import axios from "axios";
import { FullResponse } from "@/types.commons";

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
      const response = await axios.post(
        "/api/askBuddy",
        { text: prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <main className="flex flex-col gap-y-5 items-center justify-start min-h-screen h-auto max-w-5xl mx-auto p-6">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto flex flex-col space-y-6 z-10">
        <h1 className="text-center text-4xl">
          To Summarize & Simplify{" "}
          <span className="text-4xl">
            your researchs: <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient font-bold">
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
