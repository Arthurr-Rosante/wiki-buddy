"use client";

import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  submitHandler: (
    e: React.FormEvent,
    prompt: string,
    setPrompt: Dispatch<SetStateAction<string>>
  ) => Promise<void>;
}

export function Form({ submitHandler }: FormProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <form
      onSubmit={(e) => submitHandler(e, prompt, setPrompt)}
      className="w-full flex flex-col items-center space-y-6"
    >
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Button type="submit" />
      <p className="text-sm text-gray-600">
        Made by{" "}
        <Link
          href="https://github.com/Arthurr-Rosante"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline inline-flex items-center"
        >
          Arthur Rocha
          <Github className="ml-1 h-4 w-4" />
        </Link>
      </p>
    </form>
  );
}
