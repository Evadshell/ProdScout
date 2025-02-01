"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function ChatInterface({ onNewJson }) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      })

      if (!response.ok) {
        throw new Error('Search request failed')
      }

      const result = await response.json()
      onNewJson(result); // Pass the entire result object
    setInput("");
      // Process each result and add to the carousel
    //   result.results.forEach(jsonData => {
    //     if (jsonData.objects && jsonData.objects[0]) {
    //       const processedData = {
    //         title: jsonData.objects[0].title || "Product Information",
    //         image_src: jsonData.objects[0].images?.[1]?.url || jsonData.objects[0].images?.[0]?.url || "/fallback.jpg",
    //         offerPrice: jsonData.objects[0].offerPrice || "N/A",
    //         availability: jsonData.objects[0].availability || false,
    //         category: jsonData.objects[0].category || "N/A",
    //         text: jsonData.objects[0].text || "No description available",
    //         pageUrl: jsonData.objects[0].pageUrl || "#",
    //         brand: jsonData.objects[0].brand || "N/A",
    //       }
    //       onNewJson(processedData)
    //     }
    //   })

    //   setInput("")
    } catch (error) {
      console.error("Error generating JSON:", error)
      // You might want to add error handling UI here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your search query..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}