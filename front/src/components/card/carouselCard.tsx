import { Image, VStack, Text, Flex } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { API_KEY } from "../../AppConsts";
import { useColorMode } from "@chakra-ui/react";

// Importe as imagens
import CLEAR_SKY_DAY from "../../assets/icons/CLEAR_SKY_DAY.png";
import CLEAR_SKY_NIGHT from "../../assets/icons/CLEAR_SKY_NIGHT.png";
import FEW_CLOUDS_DAY from "../../assets/icons/FEW_CLOUDS_DAY.png";
import FEW_CLOUDS_NIGHT from "../../assets/icons/FEW_CLOUDS_NIGHT.png";
import SCATTERED_CLOUDS_DAY from "../../assets/icons/SCATTERED_CLOUDS_DAY.png";
import SCATTERED_CLOUDS_NIGHT from "../../assets/icons/SCATTERED_CLOUDS_NIGHT.png";
import BROKEN_CLOUDS_DAY from "../../assets/icons/BROKEN_CLOUDS_DAY.png";
import BROKEN_CLOUDS_NIGHT from "../../assets/icons/BROKEN_CLOUDS_NIGHT.png";
import SHOWER_RAIN_DAY from "../../assets/icons/SHOWER_RAIN_DAY.png";
import SHOWER_RAIN_NIGHT from "../../assets/icons/SHOWER_RAIN_NIGHT.png";
import RAIN_DAY from "../../assets/icons/RAIN_DAY.png";
import RAIN_NIGHT from "../../assets/icons/RAIN_NIGHT.png";
import THUNDERSTORM_DAY from "../../assets/icons/THUNDERSTORM_DAY.png";
import THUNDERSTORM_NIGHT from "../../assets/icons/THUNDERSTORM_NIGHT.png";
import SNOW_DAY from "../../assets/icons/SNOW_DAY.png";
import SNOW_NIGHT from "../../assets/icons/SNOW_NIGHT.png";
import MIST_DAY from "../../assets/icons/MIST_DAY.png";
import MIST_NIGHT from "../../assets/icons/MIST_NIGHT.png";

enum WeatherIcons {
  CLEAR_SKY_DAY = "01d",
  CLEAR_SKY_NIGHT = "01n",
  FEW_CLOUDS_DAY = "02d",
  FEW_CLOUDS_NIGHT = "02n",
  SCATTERED_CLOUDS_DAY = "03d",
  SCATTERED_CLOUDS_NIGHT = "03n",
  BROKEN_CLOUDS_DAY = "04d",
  BROKEN_CLOUDS_NIGHT = "04n",
  SHOWER_RAIN_DAY = "09d",
  SHOWER_RAIN_NIGHT = "09n",
  RAIN_DAY = "10d",
  RAIN_NIGHT = "10n",
  THUNDERSTORM_DAY = "11d",
  THUNDERSTORM_NIGHT = "11n",
  SNOW_DAY = "13d",
  SNOW_NIGHT = "13n",
  MIST_DAY = "50d",
  MIST_NIGHT = "50n",
}

// Mapeamento inverso de WeatherIcons para as importações de imagens
const WeatherIconsImageMap: Record<WeatherIcons, string> = {
  [WeatherIcons.CLEAR_SKY_DAY]: CLEAR_SKY_DAY,
  [WeatherIcons.CLEAR_SKY_NIGHT]: CLEAR_SKY_NIGHT,
  [WeatherIcons.FEW_CLOUDS_DAY]: FEW_CLOUDS_DAY,
  [WeatherIcons.FEW_CLOUDS_NIGHT]: FEW_CLOUDS_NIGHT,
  [WeatherIcons.SCATTERED_CLOUDS_DAY]: SCATTERED_CLOUDS_DAY,
  [WeatherIcons.SCATTERED_CLOUDS_NIGHT]: SCATTERED_CLOUDS_NIGHT,
  [WeatherIcons.BROKEN_CLOUDS_DAY]: BROKEN_CLOUDS_DAY,
  [WeatherIcons.BROKEN_CLOUDS_NIGHT]: BROKEN_CLOUDS_NIGHT,
  [WeatherIcons.SHOWER_RAIN_DAY]: SHOWER_RAIN_DAY,
  [WeatherIcons.SHOWER_RAIN_NIGHT]: SHOWER_RAIN_NIGHT,
  [WeatherIcons.RAIN_DAY]: RAIN_DAY,
  [WeatherIcons.RAIN_NIGHT]: RAIN_NIGHT,
  [WeatherIcons.THUNDERSTORM_DAY]: THUNDERSTORM_DAY,
  [WeatherIcons.THUNDERSTORM_NIGHT]: THUNDERSTORM_NIGHT,
  [WeatherIcons.SNOW_DAY]: SNOW_DAY,
  [WeatherIcons.SNOW_NIGHT]: SNOW_NIGHT,
  [WeatherIcons.MIST_DAY]: MIST_DAY,
  [WeatherIcons.MIST_NIGHT]: MIST_NIGHT,
};
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

export function CarouselCard({ cidade }: { cidade: string }) {
  const [data, setData] = useState<WeatherData | null>(null);
  const { colorMode } = useColorMode();

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
    <VStack
      bg={colorMode === "light" ? "gray.100" : "#1A202C"}
      w="160px"
      h="260px"
      borderRadius="15px"
      justifyContent="space-between"
      p="15px"
      gap={"10px"}
    >
      <Flex align="flex-start" w={"100%"}>
        <Text
          paddingLeft="10px"
          paddingRight={"10px"}
          paddingTop={"5px"}
          paddingBottom={"5px"}
          bg={colorMode === "light" ? "gray.300" : "gray.500"}
          borderRadius={"10px"}
        >
          {data?.name}
        </Text>
      </Flex>
      <Flex
        align="center"
        direction={"column"}
        flex="2"
        justifyContent={"space-between"}
      >
        <Flex direction={"column"} align="center">
          <Image
            w="70px"
            h="70px"
            filter={"drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))"}
            src={WeatherIconsImageMap[data?.weather[0].icon as WeatherIcons]}
          />
          <Text textTransform="capitalize">{data?.weather[0].description}</Text>
        </Flex>
        <Text fontSize={"45px"}>
          {data?.main.temp.toFixed(0)}
          <span style={{ fontSize: 40 }}>℃</span>
        </Text>
        <Flex>
          <Text fontSize={"20px"}>{data?.main.temp_min.toFixed(0)}℃</Text>
          <Text fontSize={"20px"}>-</Text>
          <Text fontSize={"20px"}>{data?.main.temp_max.toFixed(0)}℃</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}
