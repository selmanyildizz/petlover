import React, { useState } from "react";
import "../Carousel.css";

const Carousel = () => {
    //Kart içeriğini gösteren index
    const [activeIndex, setActiveIndex] = useState(0);
    //Kart içeriklerini aşağıda title ve link olarak tanımladım
    const cards = [
        { title: "UI/UX Solutions", link: "https://chatgpt.com/" },
        { title: "Logo Design", link: "https://www.figma.com/design/WkRBjznGK5h3nCOQRZmvUR/Slider?node-id=1-155&node-type=frame&t=Qj8fTkOCQ4Fkk5yV-0" },
        { title: "Brand Design", link: "https://www.udemy.com/" }
    ];
    //Kart içeriğini gösteren index-ileri
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };
    //Kart içeriğini gösteren index-geri
    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };
    //return
    return (
        <div className="carousel-container container">
            <div className="carousel-title">Let's Check!</div>
            <div className="carousel">
                {/* Kart içeriği */}
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${index === activeIndex ? "active" : ""}`}
                    >
                        {index === activeIndex ? (
                            <div className="card-content">
                                <div className="card-title">{card.title}</div>
                                <a href={card.link} target="_blank"><i className="arrow pi pi-arrow-right"></i></a>

                            </div>
                        ) : (
                            <div className="card-title">{card.title}</div>
                        )}
                    </div>
                ))}
                <div className="logo"></div> {/* Add your logo here */}
            </div>
            <div className="controls">
                <i className="control-arrow pi pi-arrow-left" onClick={handlePrev}></i>
                <i className="control-arrow pi pi-arrow-right" onClick={handleNext}></i>
            </div>
        </div>
    );
};

export default Carousel;
