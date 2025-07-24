import { baseUrl } from "../../utils/baseUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setOrdersData([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/myOrdersData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const response = await res.json();
      const orders = response?.order_data?.order_data || [];
      setOrdersData(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrdersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex w-screen flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-semibold">Loading orders...</h1>
        </div>
      ) : Array.isArray(ordersData) && ordersData.length > 0 ? (
        <div className="container my-4 mx-auto">
          {ordersData.map((orders, i) => (
            <div key={i}>
              {orders.map((data, j) => (
                <div key={j}>
                  {data.order_date ? (
                    <div className="font-bold text-xl mb-2">
                      {data.order_date}
                      <hr />
                    </div>
                  ) : (
                    <div className="my-4 w-96 border-black border-gradient p-4 dark:border-white rounded-lg">
                      <div className="relative w-full rounded-lg h-72">
                        <Image
                          src={data.img}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                          alt="pizza"
                        />
                      </div>
                      <div className="font-bold text-xl">{data.name}</div>
                      <div className="flex justify-between items-center">
                        <div>{data.qty}</div>
                        <div>{data.size}</div>
                        <div className="font-semibold">{data.price}/-</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-screen flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">No previous Orders 😅</h1>
          <Link href="/" className="text-violet-500 text-xl hover:font-bold mt-8">
            Go back to the home
          </Link>
        </div>
      )}
    </>
  );
}

export default Orders;
