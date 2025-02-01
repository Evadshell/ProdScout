"use client"
import { useState, useEffect } from "react"
import { ChatInterface } from "./components/ChatInterface"
import { JsonCarousel } from "./components/JsonCarousel"

export default function Home(){
  const [jsonData, setJsonData] = useState([])

  useEffect(() => {
    // Function to fetch all JSON files
    const fetchJsonData = async () => {
      try {
        const responses = await Promise.all([
          fetch("/diffbot_response_1.json"),
          fetch("/diffbot_response_2.json"),
          fetch("/diffbot_response_3.json"),
        ])

        const data = await Promise.all(responses.map((res) => res.json()))

        // Extract the first object from each response
        const processedData = data.map((response) => {
          const product = response.objects[0]
          return {
            title: product.title || "Product Information",
            image_src: product.images?.[1]?.url || product.images?.[0]?.url || "/fallback.jpg",
            offerPrice: product.offerPrice || "N/A",
            availability: product.availability || false,
            category: product.category || "N/A",
            text: product.text || "No description available",
            pageUrl: product.pageUrl || "#",
            brand: product.brand || "N/A",
          }
        })

        setJsonData(processedData)
      } catch (error) {
        console.error("Error loading JSON files:", error)
      }
    }

    fetchJsonData()
  }, [])

  const handleNewJson = (newJson) => {
    setJsonData((prevData) => [...prevData, newJson])
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <h1 className="text-4xl font-bold">Product Search</h1>
      <ChatInterface onNewJson={handleNewJson} />
      <JsonCarousel jsonData={jsonData} />
    </main>
  )
}