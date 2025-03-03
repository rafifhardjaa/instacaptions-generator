"use client";
import { useState, useEffect } from "react";

const categories = ["motivasi", "lucu", "cinta", "Rizz"];
const hashtags = {
  motivasi: "#motivation #hustle #grind #success",
  lucu: "#funny #memes #lol #relatable",
  cinta: "#love #relationship #heart #romance",
  Rizz: "#pickuplines #flirt #crush #love"
};

export default function Home() {
  const [category, setCategory] = useState("motivasi");
  const [caption, setCaption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const generateCaption = async () => {
    const res = await fetch(`/api/captions?category=${category}`);
    const data = await res.json();
    if (data.caption) setCaption(`${data.caption} \n\n${hashtags[category]}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setShowModal(true);
    new Audio("/mouse-click.mp3").play();
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <div className={`flex flex-col items-center min-h-screen justify-center transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-purple-900 to-gray-900" : "bg-white text-gray-900"} p-4`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-purple-500 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-purple-500 animate-pulse">Instagram Caption Generator 🚀</h1>

        <label className="mb-2 text-purple-500">Pilih Kategori:</label>
        <select
          className="p-2 mb-4 bg-purple-800 bg-opacity-50 border border-purple-600 rounded focus:ring-2 focus:ring-purple-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={generateCaption}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded transition duration-300"
          >
            Generate Caption
          </button>
          {caption && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-purple-400 hover:bg-purple-500 text-white font-bold rounded transition duration-300"
            >
              Copy
            </button>
          )}
        </div>

        {caption && (
          <div className="mt-4 p-4 bg-purple-700 bg-opacity-50 border border-purple-600 rounded shadow-md">
            <p className="text-white whitespace-pre-line">{caption}</p>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
          Caption copied to clipboard! 📋✅
        </div>
      )}
    </div>
  );
}
