import React from "react";

function ProductOne() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      {/* Card produit */}
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 flex flex-col lg:flex-row gap-6">

        {/* Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="https://img.fantaskycdn.com/3cfdc69ec9dccf4578e70f9319289440_750x.jpeg"
            alt="Produit"
            className="rounded-2xl object-cover max-h-[400px]"
          />
        </div>

        {/* Détails */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Titre */}
          <h1 className="text-2xl font-bold text-gray-800">
            Leggings Sport Femme
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            Leggings de sport pour femme, confortables et extensibles. Parfait pour yoga, fitness et running.
          </p>

          {/* Infos produit */}
          <div className="flex flex-col gap-2 text-gray-700">
            <p><span className="font-semibold">Prix :</span> 2000 DZD</p>
            <p><span className="font-semibold">Catégorie :</span> Leggings</p>
            <p><span className="font-semibold">Stock :</span> 300</p>
            <p><span className="font-semibold">Tailles disponibles :</span> S, M, L, XL</p>
            <p><span className="font-semibold">Couleurs disponibles :</span> Noir, Gris, Bleu</p>
            <p><span className="font-semibold">Status :</span> <span className="text-green-600 font-medium">Disponible</span></p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
              Modifier
            </button>
            <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
              Supprimer
            </button>
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
              Ajouter
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductOne;
