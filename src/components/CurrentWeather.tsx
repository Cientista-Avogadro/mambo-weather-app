import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ApiResponse, CurrentWeatherProps } from "../interfaces/api";
import { IinitialProps } from "../redux/store";
import SpinnerLoading from "./SpinnerLoading";

function CurrentWeather({ isFavorite, data }: CurrentWeatherProps) {
  const [favoriteData, setFavoriteData] = useState<ApiResponse[]>([]);
  const dispatch = useDispatch();
  const { loading, favoriteWeather } = useSelector(
    (state: IinitialProps) => state
  );
  if (loading) {
    return <SpinnerLoading />;
  }

  useEffect(() => {
    setFavoriteData(favoriteWeather);
  }, []);

  if (!data) {
    return (
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
    );
  }

  const handleClick = (data: ApiResponse) => {
    const aux = favoriteData?.find(
      (item: ApiResponse) => item.name === data.name
    );
    if (aux) {
      toast("este item já se encontra nos favoritos", {
        delay: 300,
        autoClose: false,
        type: "error",
        theme: "colored",
      });
      return;
    }
    favoriteData?.push(data);
    toast("Adicionado aos favoritos", {
      delay: 300,
      autoClose: false,
      type: "success",
      theme: "colored",
    });

    dispatch({
      type: "set",
      favoriteWeather: favoriteData,
    });
  };

  const handleRemove = (data: ApiResponse) => {
    const res = favoriteData.filter(
      (item: ApiResponse) => item.name !== data.name && item
    );
    toast("removido dos favoritos, da um refresh", {
      delay: 300,
      autoClose: false,
      type: "success",
      theme: "colored",
    });
    setFavoriteData(res);
    dispatch({
      type: "set",
      favoriteWeather: res,
    });
  };

  return (
    <div className="bg-gray-900 flex flex-col gap-3 p-5 rounded text-white">
      <header className="flex items-center justify-between gap-10 flex-wrap">
        <div className="flex flex-col justify-center gap-2">
          <strong className="text-4xl">{data?.city || data?.name}</strong>
          <span className="text-sm text-gray-200">
            {data?.weather[0].description}
          </span>
        </div>
        <img
          src={`src/assets/icons/${data?.weather[0].icon}.png`}
          alt="weather state"
        />
        {!isFavorite ? (
          <button
            onClick={() => handleClick(data)}
            className="bg-green-700 p-4 rounded"
          >
            Add Favorito
          </button>
        ) : (
          <button
            onClick={() => handleRemove(data)}
            className="bg-red-700 p-4 rounded"
          >
            Rem favorito
          </button>
        )}
      </header>
      <main className="flex justify-evenly flex-wrap">
        <div className="flex flex-col gap-2 items-start">
          <span className="text-[100px]">{Math.round(data?.main.temp)}°C</span>
          <div className="flex justify-between gap-2">
            <span className="text-2xl">Min:</span>
            <span className="text-2xl">
              {Math.round(data?.main.temp_min)}°C
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-2xl">Max:</span>
            <span className="text-2xl">
              {Math.round(data?.main.temp_max)}°C
            </span>
          </div>
        </div>
        <div className="">
          <span className="text-3xl pb-[10px] block">Detalhes</span>
          <div className="flex justify-between gap-2">
            <span className="">Feels Like:</span>
            <span className="">{Math.round(data?.main.feels_like)}°C</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="">Vento:</span>
            <span className="">{data?.wind.speed} m/s</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="">Humidade:</span>
            <span className="">{data?.main.humidity}%</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="">Pressão:</span>
            <span className="">{data?.main.pressure} hPa</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CurrentWeather;
