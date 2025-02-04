"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FullResponse } from "@/types.commons";
import axios from "axios";

import { Form } from "@/components/Form";
import { Feed } from "@/components/Feed";
import { Loading } from "@/components/Loading";
import { AlertDialog } from "@/components/AlertDialog";

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
      if (prompt.trim() === "") {
        toast({
          title: "Uh Oh...",
          description: "⚠️ To be answered, One must first ask ;) ⚠️",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post(
        "/api/askBuddy",
        { text: prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response || !response.data) {
        toast({
          title: "Uh Oh...",
          description:
            "It seems WikiBuddy needs more info to process your request",
          variant: "destructive",
        });
        return;
      }

      setResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              toast({
                title: "⚠️ Unauthorized",
                description:
                  "The API key was invalid or has fully used up its quota.",
                variant: "destructive",
              });
              break;
            case 413:
              toast({
                title: "⚠️ Request too Large",
                description:
                  "The request was too large (Up to 200kb may be processed per request).",
                variant: "destructive",
              });
              break;
            case 500:
              toast({
                title: "⚠️ Internal Server Error",
                description:
                  "Please provide more info(text) about your request so WikiBuddy can better understand it.",
              });
              break;
          }
        } else {
          toast({
            title: "⚠️ Request Error",
            description: `Something went wrong: ${error.message}`,
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
      <main className="flex flex-col gap-y-5 items-center justify-center min-h-screen h-auto max-w-5xl mx-auto p-6">
        <AlertDialog />
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto flex flex-col space-y-6">
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
