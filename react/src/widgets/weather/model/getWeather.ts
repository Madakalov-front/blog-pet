import { useEffect, useState } from "react";

type WeatherInfo = {
  name: string;
  temp: number;
  weather: string;
  iconCode: string;
};

export const useGetWeather = (city: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>();

  useEffect(() => {
    const fetchWeather = async () => {
      const resolve = await fetch(
        `${apiUrl}?q=${city}&lang=ru&units=metric&appid=${apiKey}`
      );
      if (!resolve.ok) throw new Error(`${resolve.ok} - статус`);
      const data = await resolve.json();

      setWeatherInfo({
        name: data.name,
        temp: Math.round(data.main.temp),
        weather: data.weather[0].description,
        iconCode: data.weather[0].icon,
      });
    };

    fetchWeather();
  }, []);

  return {
    ...weatherInfo,
  };
};
