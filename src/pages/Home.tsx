import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CurrentWeather from "../components/CurrentWeather";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import { ApiResponse } from "../interfaces/api";

const weatherUrl = "https://api.openweathermap.org/data/2.5";
const weatherApiKey = "1ecd96ad0c169d7181f4447aac928505";

function Home() {
  const [coords, setCoords] = useState<
    { lat: number; lon: number } | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState<ApiResponse>();
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchDate: any) => {
    setLoading(true);
    const [lat, lon] = searchDate.value.split(" ");

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
        setCurrentWeather({ ...weatherResponse });
        setForecast({ ...forecastResponse });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(({ coords }) => {
        setCoords({ ...coords, lat: coords.latitude, lon: coords.longitude });
      });
    }
  }, []);

  const handleClick = () => {
    setLoading(true);
    const currentWeatherFetch = fetch(
      `${weatherUrl}/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${weatherApiKey}&units=metric`
    );
    const ForecastFetch = fetch(
      `${weatherUrl}/forecast?lat=${coords?.lat}&lon=${coords?.lon}&appid=${weatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, ForecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();
        setCurrentWeather({ ...weatherResponse });
        setForecast({ ...forecastResponse });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  console.log(currentWeather);
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
        <main>
          {currentWeather ? (
            <CurrentWeather data={currentWeather} loading={loading} />
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
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
}

export default Home;
