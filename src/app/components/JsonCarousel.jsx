"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";

export function JsonCarousel({ jsonData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jsonData.length);
  };

  const prevCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + jsonData.length) % jsonData.length
    );
  };

  if (jsonData.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Loading product data...</p>
        </CardContent>
      </Card>
    );
  }

  const currentItem = jsonData[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{currentItem.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentItem.image_src ? (
            <div className="w-full flex justify-center">
              <Image
                src={currentItem.image_src}
                alt={currentItem.title || "Product Image"}
                width={200} // Set an appropriate width
                height={200} // Set an appropriate height
                className="rounded-md object-contain"
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">No Image Available</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold">{currentItem.offerPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Brand</p>
              <p className="font-semibold">{currentItem.brand}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{currentItem.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <p
                className={`font-semibold ${
                  currentItem.availability ? "text-green-600" : "text-red-600"
                }`}
              >
                {currentItem.availability ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-sm mt-1">{currentItem.text}</p>
          </div>
          <a
            href={currentItem.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-500 hover:text-blue-700 mt-4"
          >
            View Product <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </CardContent>
      </Card>

      <Button
        variant="ghost"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 h-8 w-8 p-0"
        onClick={prevCard}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 h-8 w-8 p-0"
        onClick={nextCard}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute -bottom-6 left-0 right-0 flex justify-center space-x-2">
        {jsonData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
