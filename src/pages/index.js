"use client"
import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
// import cardData from "../store/cardData.json"
import { useEffect, useState } from "react";
import { get } from "mongoose";
import { baseUrl } from "@/utils/baseUrl";
import Head from "next/head";


export default function Home({ data }) {

  // console.log("data",data);

  const categories = new Set();
  let categoryArray;
  const [typeFilter, setTypeFilter] = useState(false)
  const foodData = [];
  const handledata = () => {
    data?.map((data) => {
      return foodData.push(data), categories.add(data.category)
    })

  }

  const dummy = async () => {
    const food = await fetch("api/foodData", { method: "GET" }).then((response) => response.json());

    console.log("food", food);

  }

  useEffect(() => {
    dummy();
  }, [])
  handledata();

  categoryArray = [...categories]
  // console.log(process.env.NODE_ENV);

  return (
    <>
    <Head>
      <title>Pizza Valley</title>
    </Head>
      <CarouselComponent />
      <div className="container mx-auto">
        <div className="my-6 space-x-5">
          <button className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${!typeFilter && "bg-slate-300 dark:bg-slate-600"}`} onClick={() => setTypeFilter(false)}>All</button>
          <button className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"}`}
            onClick={() => setTypeFilter("Veg")}>
            <span className={"lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"}>
              ●
            </span>
            Veg</button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"}`}
            onClick={() => setTypeFilter("Non-Veg")}>
            <span className={"lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"}>
              ●
            </span>
            Non-Veg</button>
        </div>


        {categoryArray.map((category) => {
          return <>
            <div key={category} className="text-4xl mt-10 uppercase font-bold">
              {category}
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center">
              <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {
                  foodData?.filter((foodData) =>
                    category === foodData.category)
                    ?.filter((foodData) => typeFilter ? typeFilter === foodData.foodType : foodData)
                    ?.map((data) => {
                      return <Card key={data.name} foodData={data} />
                    })
                }
              </div>
            </div>
          </>
        })}
      </div>

    </>
  );
}


export async function getStaticProps() {
  let data = [];
  try {
    const pizzaData = await fetch(baseUrl + "/api/foodData", { method: "GET" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Fetch Error:", error.message);
        return null;
      });

    console.log("API Response:", pizzaData);

    // Handle different API response structures
    data = pizzaData?.data || pizzaData || [];
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
  }

  return {
    props: {
      data,
    },
  };
}
