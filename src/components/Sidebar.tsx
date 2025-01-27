"use client";

import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed top-0 right-0 z-50 w-1/4">
      <button
        className="fixed top-4 right-4 z-50 bg-red-500 text-white p-2 rounded-full shadow-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Related Topics"}
      </button>

      <div
        className={`fixed top-0 right-0 h-full bg-red-500 w-64 transform transition-transform duration-300 z-40 flex flex-col p-4 shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:static lg:w-1/4`}
      >
        <h1 className="text-white text-xl font-bold mb-4">Related Topics</h1>
        <ul className="space-y-2">
          <li className="text-white">Topic 1</li>
          <li className="text-white">Topic 2</li>
          <li className="text-white">Topic 3</li>
          <li className="text-white">Topic 4</li>
        </ul>
      </div>

      {/* Overlay em telas pequenas */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
