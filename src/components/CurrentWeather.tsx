import { toast } from "react-toastify";
import { ApiResponse, CurrentWeatherProps } from "../interfaces/api";

function CurrentWeather({ data, isFavorite }: CurrentWeatherProps) {
  const handleClick = (data: ApiResponse) => {
    let load: ApiResponse[] =[];
    load =JSON.parse(localStorage.getItem("favorite") || "");
    const aux = load.find((item:ApiResponse) => item.name === data.name);
    if (aux) {
      toast("este item já se encontra nos favoritos", {
        delay: 300,
        autoClose: false,
        type: "error",
        theme: "colored",
      });
      return;
    }
    const favoritoData = load;
    favoritoData.push(data);
    localStorage.setItem("favorite", JSON.stringify(favoritoData));
    toast("Adicionado aos favoritos", {
      delay: 300,
      autoClose: false,
      type: "success",
      theme: "colored",
    });
  };

  const handleRemove = (data: any) => {
    const load = JSON.parse(localStorage.getItem("favorite") || "");
    const res = load.filter((item: any) => item.name !== data.name && item);
    localStorage.setItem("favorite", JSON.stringify(res));
    location.reload();
    toast("removido dos favoritos, da um refresh", {
      delay: 300,
      autoClose: false,
      type: "success",
      theme: "colored",
    });
  };

  return (
    <div className="bg-gray-900 flex flex-col gap-3 p-5 rounded text-white">
      <header className="flex items-center justify-between gap-8 flex-wrap">
        <div className="flex flex-col justify-center gap-2">
          <strong className="text-4xl">{data.city || data.name}</strong>
          <span className="text-sm text-gray-200">
            {data.weather[0].description}
          </span>
        </div>
        <img
          src={`src/assets/icons/${data.weather[0].icon}.png`}
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
          <span className="text-[100px]">{Math.round(data.main.temp)}°C</span>
          <div className="flex justify-between gap-2">
            <span className="text-2xl">Min:</span>
            <span className="text-2xl">{Math.round(data.main.temp_min)}°C</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-2xl">Max:</span>
            <span className="text-2xl">{Math.round(data.main.temp_max)}°C</span>
          </div>
        </div>
        <div className="">
          <span className="text-3xl pb-[10px] block">Details</span>
          <div className="flex justify-between gap-2">
            <span className="">Feels Like:</span>
            <span className="">22</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="">Wind:</span>
            <span className="">2 m/s</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="">Humidity:</span>
            <span className="">15%</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="">Pressure:</span>
            <span className="">22 hPa</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CurrentWeather;
