import { useGetWeather } from "@/widgets/weather/model/getWeather";
import { useEffect } from "react";
import styles from "./Weather.module.scss";

type WeatherProps = {
    city: string;
};

export const Weather = ({ city }: WeatherProps) => {
    const weatherInfo = useGetWeather(city);

    useEffect(() => {}, [weatherInfo]);

    const { name, temp, weather, iconCode } = weatherInfo;
    
    return (
        weatherInfo.name && (
            <div className={styles.weather}>
                <h2 className={styles.weather__city}>{name}</h2>
                <div className={styles.weather__info}>
                    <img
                        className={styles.weather__icon}
                        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                        alt={weather}
                    />
                    <div className={styles.weather__details}>
                        <p className={styles.weather__temp}>{temp}°C</p>
                        <p className={styles.weather__desc}>{weather}</p>
                    </div>
                </div>
            </div>
        )
    );
};
