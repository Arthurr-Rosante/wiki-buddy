"use client";

import { Topic } from "@/types.commons";
import { use, useState } from "react";

interface SidebarProps {
  topics: Topic[];
}

function Sidebar({ topics }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botão de abrir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 right-5 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg"
      >
        {isOpen ? "Close" : "Related Topics"}
      </button>

      {/* Sidebar */}
      <div
        className={`overflow-y-auto fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 p-4 border-l`}
      >
        <h1 className="text-xl font-bold mb-4">Related Topics</h1>
        {topics.map((topic) => (
          <a
            target="_blank"
            href={topic.wikiLink}
            className="block border-b p-2 hover:bg-gray-100 transition"
            key={topic.id}
          >
            {topic.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
