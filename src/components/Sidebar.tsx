"use client";

import { Topic } from "@/types.commons";
import { useState } from "react";
import { X, Copy, CopyCheck } from "lucide-react";

interface SidebarProps {
  topics: Topic[];
}

function Sidebar({ topics }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | boolean>("");

  const handleCopy = (topicLabel: string) => {
    setCopied(topicLabel);
    navigator.clipboard.writeText(`Show me an article about ${topicLabel}`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 right-5 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg"
      >
        {isOpen ? <X /> : "Related Topics"}
      </button>

      <div
        className={`overflow-y-auto fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 p-4 border-l`}
      >
        <h1 className="text-xl font-bold mb-6">Related Topics</h1>
        {topics.map((topic) => (
          <button
            className="w-full text-start block border-b p-2 hover:bg-gray-100 transition"
            key={topic.id}
            onClick={() => {
              handleCopy(topic.label);
            }}
          >
            <span className="flex items-center justify-between pr-2">
              {topic.label}
              {copied === topic.label ? (
                <CopyCheck className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
