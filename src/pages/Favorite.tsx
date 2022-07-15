import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CurrentWeather from "../components/CurrentWeather";

function Favorite() {
  const [data, setData] = useState<[]>();
  useEffect(() => {
    const load = JSON.parse(localStorage.getItem("favorite") || "");
    setData(load);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="p-4 bg-gray-900 text-white flex justify-center text-xl">
        <Link
          to={"/"}
          className="p-2 bg first-letter:text-orange-700 first-letter:text-3xl"
        >
          Mamboo <span className="text-orange-700 ">Weather</span>
        </Link>
      </header>
      <main className="text-black  mt-10 flex flex-col items-center">
        <div className="flex gap-3 items-center">
          <h1 className="text-3xl mb-5">Lista de Favoritos ({data?.length})</h1>
          <button
            onClick={() => {
              localStorage.removeItem('favorite');
              localStorage.setItem('favorite',JSON.stringify([]))
              location.reload();
            }}
            className="bg-green-700 p-4 rounded"
          >
            Limpar
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {data &&
            data.map((item) => (
              <CurrentWeather data={item} isFavorite={true} />
            ))}
        </div>
      </main>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default Favorite;
