import { CartContext } from '@/utils/ContextReducer';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useState } from 'react'

const Card = (props) => {
    const data = props.foodData;
    const { state, dispatch } = useContext(CartContext)
    const priceOptions = Object.keys(data.price);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]);

    const handleQty = (e) => {
        setQty(e.target.value);
    };

    const handleSize = (e) => {
        setSize(e.target.value);
    };

    const handleAddToCart = async () => {

        const updatedItem = await state.find((item) => item.tempId === data["_id"] + size);

        if (!updatedItem) {
            dispatch({
                type: "ADD",
                id: data["_id"],
                tempId: data["_id"] + size,
                name: data.name,
                price: finalPrice,
                qty: qty,
                priceOptions: size,
                img: data.img
            })
        }
        console.log("state", state);
        if (updatedItem) {
            dispatch({
                type: "UPDATE",
                tempId: data["_id"] + size,
                price: finalPrice,
                qty: qty,
            })
        }

    }
    let finalPrice = qty * parseInt(data.price[size]);
    return (
        <div className="box">
            <div className="w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient h-[580px] flex flex-col">

                <Link href={{ pathname: "/Item/[item]" }} as={`Item/${data["_id"]}`}>
                    <div className="relative w-full h-80">
                        <Image src={data.img} layout="fill" objectFit="cover" alt="pizza" />
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-grow">
                        <div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
                        <p className="short_description text-gray-700 dark:text-gray-400 text-base line-clamp-3 overflow-hidden">
                            {data.description}
                        </p>
                    </div>
                </Link>
                {/* Actions Section */}
                <div className="flex px-4 justify-between">
                    <select
                        className="h-10 p-1 text-black hover:font-bold font:semi-bold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
                        onChange={handleQty}
                    >
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        className="h-10 p-1 text-black hover:font-bold font:semi-bold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
                        onChange={handleSize}
                    >
                        {priceOptions.map((options) => {
                            return (
                                <option key={options} className="uppercase" value={options}>
                                    {options}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Footer Section */}
                <div className="flex p-4 font-bold justify-between mt-auto">
                    <button className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                    <p className="p-4 text-xl">${finalPrice}</p>
                </div>

            </div>
        </div>
    );
};

export default Card;
