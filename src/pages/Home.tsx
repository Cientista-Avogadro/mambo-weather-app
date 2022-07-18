import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import NavBar from "../components/NavBar";

import Search from "../components/Search";
import { ApiResponse } from "../interfaces/api";

const weatherUrl = "https://api.openweathermap.org/data/2.5";
const weatherApiKey = "1ecd96ad0c169d7181f4447aac928505";

function Home() {
  const [currentWeather, setCurrentWeather] = useState<ApiResponse>();
  const [currentForecast, setCurrentForecast] = useState<any>();
  const [coords, setCoords] = useState<{ lat: number; lon: number }>();
  const dispatch = useDispatch();
  const handleSearchChange = (searchDate: any) => {
    const [lat, lon] = searchDate.value.split(" ");
    getApiWeatherForecast({
      lat,
      lon,
    });
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (geolocation) {
      geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lon: longitude });
      });
    }
  }, []);

  const handleClick = () => {
    if (!coords) {
      return;
    }
    getApiWeatherForecast({
      lat: coords?.lat,
      lon: coords?.lon,
    });
  };

  const getApiWeatherForecast = ({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  }) => {
    const currentWeatherFetch = fetch(
      `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );
    const ForecastFetch = fetch(
      `${weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, ForecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();
        setCurrentWeather(weatherResponse);
        setCurrentForecast(forecastResponse);
      })
      .catch((err) => console.log(err))
      .finally(() =>
        dispatch({
          type: "set",
          loading: false,
        })
      );
  };

  return (
    <div>
      <NavBar />
      <div className="pt-5 px-10 flex flex-col items-center gap-20">
        <header className="flex items-center gap-5 justify-center">
          <Search onSearchChange={handleSearchChange} />
          <button
            className="p-3 bg-purple-700 text-white rounded"
            onClick={handleClick}
          >
            Minha Localização
          </button>
          <Link
            to={"favorite"}
            className="p-3 bg-orange-700 text-white rounded"
          >
            Favoritos
          </Link>
        </header>
        <div>
          <main className="flex flex-col items-center justify-start">
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentForecast ? (
              <Forecast data={currentForecast} />
            ) : (
              <div
                className="
            flex
            flex-col
            items-center
            justify-center
            mt-40
            "
              >
                <strong className="text-4xl">Sem Dados para Mostrar</strong>
                <span className="text-md text-orange-500">
                  Por favor, pesquisa por um lugar
                </span>
              </div>
            )}
          </main>
        </div>

        <ToastContainer autoClose={1500} />
      </div>
    </div>
  );
}

export default Home;
