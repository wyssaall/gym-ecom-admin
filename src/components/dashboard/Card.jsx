import React from "react";

function Card() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        flex
        flex-col
        gap-3
        transition
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* titre */}
      <div className="flex items-center justify-between">

        <h2 className="text-gray-500 text-sm font-medium uppercase">
          Total ventes
        </h2>

      </div>

      {/*  valeure */}
      <h1 className="text-3xl font-bold text-gray-900">
        200
      </h1>

      {/* par semaine */}
      <p className="text-sm text-green-600 font-medium">
        +12% par semaine
      </p>

    </div>
  );
}

export default Card;
