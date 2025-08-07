import axios from "axios";
import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";

const Upload = () => {
  const [bulkInput, setBulkInput] = useState("");
  const [parsedQA, setParsedQA] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleParse = (e) => {
    e.preventDefault();

    const lines = bulkInput.split("\n");
    const qaPairs = [];
    let currentQ = "", currentA = "";

    lines.forEach((line) => {
      if (line.startsWith("Q:")) {
        currentQ = line.replace("Q:", "").trim();
      } else if (line.startsWith("A:")) {
        currentA = line.replace("A:", "").trim();
        if (currentQ && currentA) {
          qaPairs.push({ Q: currentQ, A: currentA });
          currentQ = "";
          currentA = "";
        }
      }
    });

    setParsedQA(qaPairs);
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();
    if (parsedQA.length === 0) return;

    setIsSubmitting(true);
    try {
      for (const qa of parsedQA) {
        await axios.post("https://ai-chat-app-backend-24sq.onrender.com/api/upload", qa);
      }
      alert("All questions submitted successfully");
      setParsedQA([]);
      setBulkInput("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit questions");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-10 transition-colors">
        <h2 className="text-3xl font-bold text-center mb-10">Bulk Q&A Submission</h2>

        {/* Input Area */}
        <form onSubmit={handleParse}>
          <label className="block text-lg font-medium mb-2">
            Paste Q&A (Format: Q: ..., A: ...)
          </label>
          <textarea
            rows="10"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder={`Q: What is React?\nA: A JavaScript library for building UI.\n\nQ: What is JSX?\nA: A syntax extension for JavaScript.`}
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Parse Questions
          </button>
        </form>

        {parsedQA.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Parsed Questions & Answers</h3>

            <form onSubmit={handleSubmitAll}>
              {parsedQA.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border-b border-gray-300 dark:border-gray-600 pb-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Question {index + 1}
                    </label>
                    <input
                      type="text"
                      value={item.Q}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Answer {index + 1}
                    </label>
                    <input
                      type="text"
                      value={item.A}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md"
                      readOnly
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit All"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
