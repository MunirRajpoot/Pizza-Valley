"use client"
import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
import cardData from "../store/cardData.json"


export default function Home() {
  const categories = new Set();
  const foodData = [];

  const handledata = () => {
    cardData.map((data) => {
      return foodData.push(data), categories.add(data.category)
    })

  }


  handledata();

  const categoryArray = [...categories]

  return (
    <>
      <CarouselComponent />
      <div className="container mx-auto">
        {categoryArray.map((category) => {
          return <>
            <div key={category} className="text-4xl mt-10 uppercase font-bold">
              {category}
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center">
              <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {
                  foodData.filter((foodData) =>
                    category === foodData.category).map((data) => {
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
