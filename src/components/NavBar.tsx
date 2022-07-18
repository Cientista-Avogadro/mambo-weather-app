import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-center text-xl">
      <Link
        to={"/"}
        className="p-2 bg first-letter:text-orange-700 first-letter:text-3xl"
      >
        Mamboo <span className="text-orange-700 ">Weather</span>
      </Link>
    </header>
  );
}

export default NavBar;
