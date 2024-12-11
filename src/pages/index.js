"use client"
import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
import cardData from "../store/cardData.json"
import { useEffect } from "react";

export default function Home() {
  const categories = new Set();
  const foodData = [];

  const handledata = () => {
    cardData.map((data) => {
      return foodData.push(data), categories.add(data.category)
    })

    const categoryArray = [...categories]


  }

  useEffect(() => {
    handledata();
  }, [])

  return (
    <>
      <CarouselComponent />
      {categoryArray.map((category) => {
        return <>
          <div key={category} className="text-4xl mt-10 uppercase font-bold">
            {category}
          </div>
          <hr />
        </>
      })}
      <Card />
    </>
  );
}
