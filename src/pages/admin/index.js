import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import Custom404 from "../404";

const sidesPriceOption = { single: "", double: "" };
const pizzaPriceOption = { regular: "", medium: "", large: "" };

const Admin = () => {
    const [mounted, setMounted] = useState(false);
    const [foodData, setFoodData] = useState({
        name: "",
        foodCategory: "",
        foodType: "",
        price: "",
        description: "",
        img: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFoodData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            // Update price options based on foodCategory selection
            if (name === "foodCategory") {
                if (value === "Pizza") {
                    updatedData.price = pizzaPriceOption;
                } else if (value === "SIDES & BEVERAGES") {
                    updatedData.price = sidesPriceOption;
                } else {
                    updatedData.price = "";
                }
            }

            return updatedData;
        });
    };

    const handlePriceChange = (key, value) => {
        setFoodData((prevData) => ({
            ...prevData,
            price: {
                ...prevData.price,
                [key]: value,
            },
        }));


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Submitted Food Data:", foodData);

        const response = await fetch("/api/createFoodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodData)
        });

        const result = await response.json();
        if (result.success) {
            alert("Food Data Created successfully");

        }
        else {
            alert("Failed to create Food Data");
        }
    };

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("isAdmin")) === true) {
            setMounted(true);

        }
    }, [])

    return (
        <>
            {
                mounted ? (
                    <div
                        style={{
                            minHeight: "90vh",
                            overflow: "scroll",

                            backgroundImage:
                                "url(https://img.freepik.com/free-photo/ingredients-near-pizza_23-2147772081.jpg?t=st=1738055501~exp=1738059101~hmac=20f3b32fa2d1810275e2a9c39f0527ee86d40df5f01d30c7666bfce359f2a4e5&w=996)",
                            backgroundSize: "cover",
                        }}
                        className="flex py-10 justify-center items-center"
                    >
                        <div className="container w-full max-w-md">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8"
                            >
                                {/* Food Name */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-300 text-sm font-bold mb-2"
                                    >
                                        Food Name
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 focus:border-indigo-700 dark:text-gray-100 focus:outline-none"
                                        placeholder="Food name"
                                        name="name"
                                        type="text"
                                        value={foodData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Food Category */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="foodCategory"
                                        className="block text-gray-300 text-sm font-bold mb-2"
                                    >
                                        Food Category
                                    </label>
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 focus:border-indigo-700 dark:text-gray-100 focus:outline-none"
                                        name="foodCategory"
                                        value={foodData.foodCategory}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Pizza">PIZZA</option>
                                        <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
                                    </select>
                                </div>

                                {/* Food Type */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="foodType"
                                        className="block text-gray-300 text-sm font-bold mb-2"
                                    >
                                        Food Type
                                    </label>
                                    <select
                                        className="shadow border rounded w-full py-2 px-3 focus:border-indigo-700 dark:text-gray-100 focus:outline-none"
                                        name="foodType"
                                        value={foodData.foodType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Food Type</option>
                                        <option value="Veg">Veg</option>
                                        <option value="Non-Veg">Non-Veg</option>
                                    </select>
                                </div>

                                {/* Food Price */}
                                {foodData.foodCategory && foodData.price && (
                                    <div className="mb-4">
                                        <label
                                            htmlFor="price"
                                            className="block text-gray-300 text-sm font-bold mb-2"
                                        >
                                            Food Price
                                        </label>
                                        {Object.keys(foodData.price).map((key) => (
                                            <div key={key} className="ml-4 mb-4">
                                                <label
                                                    htmlFor={key}
                                                    className="block text-gray-300 text-sm font-bold mb-2"
                                                >
                                                    {key}
                                                </label>
                                                <input
                                                    name={key}
                                                    placeholder={`Price of ${key}`}
                                                    className="shadow border rounded w-full py-2 px-3 focus:border-indigo-700 dark:text-gray-100 focus:outline-none"
                                                    value={foodData.price[key]}
                                                    type="number"
                                                    onChange={(e) => handlePriceChange(key, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-300 text-sm font-bold mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="shadow border rounded w-full py-2 px-3 focus:border-indigo-700 dark:text-gray-100 focus:outline-none"
                                        placeholder="Description"
                                        name="description"
                                        value={foodData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Food Image */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="img"
                                        className="block text-gray-300 text-sm font-bold mb-2"
                                    >
                                        Food Image
                                    </label>
                                    <input
                                        className="shadow border rounded w-full py-2 px-3 focus:border-indigo-700 dark:text-gray-100 focus:outline-none"
                                        placeholder="Image URL"
                                        name="img"
                                        type="url"
                                        value={foodData.img}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                )
                    : (
                        <Custom404 />
                    )
            }

        </>
    );
};

export default Admin;
