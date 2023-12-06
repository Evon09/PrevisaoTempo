import { Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { API_KEY } from "../../AppConsts";

// Mapeamento inverso de WeatherIcons para as importações de imagens

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[]; // weather é uma matriz de objetos
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    wer: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export function Temp({ cidade }: { cidade: string }) {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async (cidade: string) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}&lang=pt_br`
        );

        if (!response.ok) {
          throw new Error("Não foi possível buscar os dados meteorológicos.");
        }

        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeatherData(cidade);
  }, [cidade]);

  return (
    <Text>
      {data?.main.temp.toFixed(0)}
      <span>℃</span>
    </Text>
  );
}
