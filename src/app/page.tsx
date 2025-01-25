"use client";

import { Form } from "@/components/Form";
import { Feed } from "@/components/Feed";
import { Dispatch, SetStateAction, useState } from "react";
import { ResponseObject, TextRazorAPIResponse } from "@/types.commons";
import { Loading } from "@/components/Loading";

export default function Home() {
  const [response, setResponse] = useState<ResponseObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/textrazor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: prompt }),
      });
      const data: TextRazorAPIResponse = await res.json();

      setResponse(data.response);
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
          Don't know Something? Just ask your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Buddy Wiki
          </span>
        </h1>
        <Form submitHandler={handleSubmit} />
      </div>
      {isLoading ? <Loading /> : <Feed buddyResponse={response} />}
    </main>
  );
}
