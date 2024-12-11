import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
    const imageProp = [
        '/carousel-img/brenna-huff-22Vt7JIf7ZI-unsplash.jpg',
        '/carousel-img/fabrizio-pullara-vHRFraV4U00-unsplash.jpg',
        '/carousel-img/henry-perks-TStCoAiFjDY-unsplash.jpg',
        '/carousel-img/mariusz-slonski-T0ro5uYHAiw-unsplash.jpg',
        '/carousel-img/thomas-tucker-MNtag_eXMKw-unsplash.jpg',
    ];

    return (
        <Carousel autoPlay showStatus={false} infiniteLoop emulateTouch showThumbs={false}>
            {imageProp.map((image, index) => (
                <div key={index} className="relative max-h-[36rem]">
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="object-cover brightness-50"
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
