import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CarouselCard } from "../card/carouselCard";
import "./carouselStyles.css";

const Carousel = () => {
  // Lista predefinida com todas as capitais do Brasil
  const capitals = [
    "Brasília",
    "Rio de Janeiro",
    "São Paulo",
    "Salvador",
    "Belo Horizonte",
    "Fortaleza",
    "Manaus",
    "Curitiba",
    "Recife",
    "Goiânia",
    "Belém",
    "Porto Alegre",
    "São Luís",
    "Maceió",
    "Teresina",
    "Campo Grande",
    "João Pessoa",
    "Cuiabá",
    "Natal",
    "Aracaju",
    "Florianópolis",
    "Vitória",
    "Porto Velho",
    "Macapá",
    "Palmas",
    "Boa Vista",
    "Rio Branco",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div style={{ maxWidth: "100%", padding: 50 }}>
      <h2>Meu Carousel</h2>
      <Slider {...settings}>
        {capitals.map((capital, index) => (
          <CarouselCard key={index} cidade={capital.toLowerCase()} />
        ))}
      </Slider>
    </div>
  );
};

// Exemplo de componente de seta personalizado
const CustomPrevArrow = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  return <div className="custom-prev-arrow" {...props}></div>;
};

// Exemplo de componente de seta personalizado
const CustomNextArrow = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  return <div className="custom-next-arrow" {...props}></div>;
};

export default Carousel;
