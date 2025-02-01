"use client";
import { useState, useEffect } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { JsonCarousel } from "./components/JsonCarousel";

export default function Home() {
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJsonData = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all([
          fetch("/diffbot_response_1.json").catch(() => ({ ok: false })),
          fetch("/diffbot_response_2.json").catch(() => ({ ok: false })),
          fetch("/diffbot_response_3.json").catch(() => ({ ok: false }))
        ]);

        const validResponses = responses.filter(response => response.ok);
        
        if (validResponses.length === 0) {
          setJsonData([]);
          return;
        }

        const data = await Promise.all(
          validResponses.map(res => res.json())
        );

        setJsonData(data);
      } catch (error) {
        console.error("Error loading JSON files:", error);
        setError("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJsonData();
  }, []);

  const handleNewJson = (newResults) => {
    if (!newResults || !Array.isArray(newResults.results)) {
      console.error("Invalid results format:", newResults);
      return;
    }
    
    setJsonData(newResults.results);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center">Product Search</h1>
        
        <ChatInterface onNewJson={handleNewJson} />
        
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          jsonData.length > 0 ? (
            <JsonCarousel jsonData={jsonData} />
          ) : (
            <div className="text-center text-gray-500">
              No products found. Try searching for something!
            </div>
          )
        )}
      </div>
    </main>
  );
}