"use client";
import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import Head from "next/head";

export default function Home({ data }) {
    const [typeFilter, setTypeFilter] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [categories, setCategories] = useState(new Set());

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/foodData`, { method: "GET" });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const food = await response.json();
                console.log("food", food);

                // Update foodData and categories
                const newCategories = new Set();
                food.forEach((item) => newCategories.add(item.category));
                setFoodData(food);
                setCategories(newCategories);
            } catch (error) {
                console.error("Error fetching food data:", error);
            }
        };

        fetchData();
    }, []);

    const categoryArray = [...categories];

    return (
        <>
            <Head>
                <title>Pizza Valley</title>
            </Head>
            <CarouselComponent />
            <div className="container mx-auto">
                <div className="my-6 space-x-5">
                    <button
                        className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${!typeFilter && "bg-slate-300 dark:bg-slate-600"}`}
                        onClick={() => setTypeFilter(false)}
                    >
                        All
                    </button>
                    <button
                        className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"}`}
                        onClick={() => setTypeFilter("Veg")}
                    >
                        <span className={"lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"}>●</span>
                        Veg
                    </button>
                    <button
                        className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${typeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"}`}
                        onClick={() => setTypeFilter("Non-Veg")}
                    >
                        <span className={"lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"}>●</span>
                        Non-Veg
                    </button>
                </div>

                {categoryArray.map((category) => (
                    <div key={category}>
                        <div className="text-4xl mt-10 uppercase font-bold">{category}</div>
                        <hr />
                        <div className="flex flex-col items-center justify-center">
                            <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {foodData
                                    .filter((item) => item.category === category)
                                    .filter((item) => (typeFilter ? typeFilter === item.foodType : true))
                                    .map((data) => (
                                        <Card key={data.name} foodData={data} />
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export async function getStaticProps() {
    let data = [];
    try {
        const response = await fetch(`${baseUrl}/api/foodData`, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const pizzaData = await response.json();
        data = pizzaData;
    } catch (error) {
        console.error("Error in getStaticProps:", error.message);
    }

    return {
        props: {
            data,
        },
    };
}