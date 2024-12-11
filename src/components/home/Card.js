import Image from 'next/image'
import React from 'react'

const Card = () => {
    const priceOptions = ["regular", "large", "medium"]
    return (
        <div className='box'>
            <div className='w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient'>
                <div className='relative w-full h-80'>
                    <Image src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" layout='fill' objectFit='cover' alt='pizza' />
                </div>
                <div className='p-4'>
                    <div className='font-bold mb-2 text-xl uppercase'>
                        Pizza Name
                    </div>
                    <p className='short_description text-gray-700 dark:text-gray-400 text-base'>description</p>
                </div>
                <div className='flex px-4 justify-between'>
                    <select className='h-100 p-1 text-black hover:font-bold font:semi-bold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded'>
                        {Array.from(Array(6), (e, i) => {
                            return <option key={i + 1} value={i + 1}>{i + 1}</option>
                        }
                        )}
                    </select>
                    <select className='h-100 p-1 text-black hover:font-bold font:semi-bold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded'>
                        {
                            priceOptions.map(options => {
                                return (
                                    <option key={options} className='uppercase' value={options}>{options}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='flex p-4 font-bold justify-between'>
                    <button className="border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700  hover:text-gray-100">Add to cart</button>
                    <p className='p-4 text-xl'>$12</p>
                </div>
            </div>
        </div>
    )
}

export default Card
