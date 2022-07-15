import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-5">
      <div className="flex gap-2">
        <span className="text-4xl">404</span>
        <div className="w-[2px] bg-red-500"></div>
        <span className="text-4xl text-red-500">Page Not Found</span>
      </div>
      <Link to={"/"} className="p-4 bg-purple-700 rounded hover:bg-purple-900 text-white">
        Voltar para inicio
      </Link>
    </div>
  );
}

export default NotFound;
