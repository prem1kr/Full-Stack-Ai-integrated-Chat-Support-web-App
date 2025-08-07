import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/admin/AdminNavbar";

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleFetchQuestion = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/uploads");
        console.log(res.data.message || "Questions fetched successfully");
        setQuestions(res.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch questions");
        setLoading(false);
      }
    };

    handleFetchQuestion();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-6 bg-base-100 min-h-screen">
        <h2 className="text-3xl font-bold text-primary mb-6">Uploaded FAQs</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-400">No FAQs uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((faq, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-base-200 border border-base-300 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-base-content">
                  Q: {faq.Q}
                </h3>
                <p className="text-sm text-gray-500 mt-2">A: {faq.A}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FAQ;
