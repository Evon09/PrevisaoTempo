import { Stack, Image, VStack, Text, Flex } from "@chakra-ui/react";

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

export function HorizontalCard() {
  const [data, setData] = useState<WeatherData | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchWeatherData = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=pt_br`
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

    // Verifica se o navegador suporta geolocalização
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Erro ao obter a localização do usuário:", error);
          // Se o usuário rejeitar, você pode tratar isso aqui
        }
      );
    } else {
      console.error("Navegador não suporta geolocalização.");
      // Lida com navegadores que não suportam geolocalização aqui
    }
  }, []);

  return (
    <Stack
      w={"97vw"}
      paddingTop={"100px"}
      paddingBottom={"100px"}
      maxH={"100vh"}
      direction={{ base: "column", sm: "column", md: "row" }}
      borderRadius={"20px"}
      bgImage={`https://source.unsplash.com/1600x900/?${data?.name}`}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      align="center"
      gap={{ base: "50px", sm: "50px", md: "0px" }}
      // justifyContent="center"
    >
      <Flex
        direction="column"
        w="100%"
        align={{
          base: "center",
          sm: "center",
          md: "flex-start",
          xl: "center",
        }}
      >
        <VStack align="flex-start" gap="25px">
          <Flex
            fontSize="70px"
            alignItems={"baseline"}
            bg="rgba(255, 255, 255, 0.4)" // Fundo translúcido
            boxShadow="0 0 10px rgba(255, 255, 255, 0.2)" // Sombra translúcida
            backdropFilter="blur(10px)" // Aplica o desfoque
            borderRadius="20px"
            p="5px"
            justify="center"
            align="center"
          >
            <Text textShadow={" 2px 2px 4px rgba(0, 0, 0, 0.5);"}>
              {data?.name}-
            </Text>
            <Image
              w="40px"
              h="40px"
              src={`https://flagsapi.com/${data?.sys.country}/flat/64.png`}
            ></Image>
          </Flex>
          {/* <Flex justifyContent="space-between" w="100%">
            <Text>data</Text>
            <Text>data</Text>
          </Flex> */}
          <Stack
            bg={colorMode === "light" ? "gray.100" : "#1A202C"}
            p="20px"
            w="100%"
            borderRadius="20px"
            gap="20px"
          >
            <Flex justifyContent="space-between">
              <Flex align="center" flex="1" gap="10px">
                <Image
                  p="5px"
                  w="50px"
                  h="50px"
                  borderRadius={"10px"}
                  bg="blue.200"
                  src="https://img.icons8.com/pastel-glyph/64/wind--v1.png"
                />
                <Flex
                  direction={{ base: "column", sm: "column", md: "row" }}
                  gap="2px"
                >
                  <Text>{data?.wind.speed} </Text>
                  <Text> Km/h </Text>
                </Flex>
              </Flex>
              <Flex align="center" flex="1" gap="10px">
                <Image
                  p="5px"
                  w="50px"
                  h="50px"
                  borderRadius={"10px"}
                  bg="blue.200"
                  src="https://img.icons8.com/ios/50/cloud--v1.png"
                />
                <Flex
                  direction={{ base: "column", sm: "column", md: "row" }}
                  gap="2px"
                >
                  <Text>Nuvens</Text>
                  <Text>{data?.clouds.all}%</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent="space-between" align="center">
              <Flex align="center" flex="1" gap="10px">
                <Image
                  p="5px"
                  w="50px"
                  h="50px"
                  borderRadius={"10px"}
                  bg="blue.200"
                  src="https://img.icons8.com/external-dashed-line-kawalan-studio/48/external-low-temprature-weather-dashed-line-kawalan-studio.png"
                />
                <Flex
                  direction={{ base: "column", sm: "column", md: "row" }}
                  gap="2px"
                >
                  <Text>{data?.main.feels_like}℃</Text>
                </Flex>
              </Flex>
              <Flex align="center" flex="1" gap="10px">
                <Image
                  p="5px"
                  w="50px"
                  h="50px"
                  borderRadius={"10px"}
                  bg="blue.200"
                  src="https://img.icons8.com/ios/50/humidity.png"
                />
                <Flex
                  direction={{ base: "column", sm: "column", md: "row" }}
                  gap="2px"
                >
                  <Text>Umidade</Text>
                  <Text>{data?.main.humidity}%</Text>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </VStack>
      </Flex>

      <Flex
        w="100%"
        h="100%"
        borderRadius="15px"
        align={"center"}
        justify={{ base: "center", sm: "center", md: "flex-end", xl: "center" }}
      >
        <VStack
          bg={colorMode === "light" ? "gray.100" : "#1A202C"}
          w="320px"
          h="400px"
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
              Today
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
                w="140px"
                h="140px"
                filter={"drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))"}
                src={
                  WeatherIconsImageMap[data?.weather[0].icon as WeatherIcons]
                }
              />
              <Text textTransform="capitalize">
                {data?.weather[0].description}
              </Text>
            </Flex>
            <Text fontSize={"90px"}>
              {data?.main.temp.toFixed(0)}
              <span style={{ fontSize: 80 }}>℃</span>
            </Text>
            <Flex>
              <Text fontSize={"20px"}>{data?.main.temp_min.toFixed(0)}℃</Text>
              <Text fontSize={"20px"}>-</Text>
              <Text fontSize={"20px"}>{data?.main.temp_max.toFixed(0)}℃</Text>
            </Flex>
          </Flex>
        </VStack>
      </Flex>
    </Stack>
  );
}
