import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flora, StateProps } from "../../type";
import { deletePlant, resetCart } from "@/redux/shoppingSlice";
import { IoTrashOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

const StripePayment = dynamic(() => import("../components/stripepayment").then((mod) => mod.default), { ssr: false });

const CartItem = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();
  return (
    <div className="bg-white/30 p-3 sm:p-6 md:p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      {/* Action buttons at the top */}
      <div className="flex flex-col gap-3 mb-6">
        <StripePayment />
        <button
          onClick={() => dispatch(resetCart())}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 rounded-lg border-[2px] border-gray-400 hover:border-orange-600 duration-200 text-sm sm:text-base font-medium"
        >
          Verwijder alle planten
        </button>
      </div>

      <div className="items-center justify-between font-semibold bg-white rounded p-2 w-full mb-4">
        <p className="w-1/3 text-sm sm:text-base">Planten in collectie</p>
      </div>

      {/* Desktop table view - hidden on mobile */}
      <table className="hidden md:table table-auto w-full text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-2">Nr</th>
          <th className="border border-gray-300 px-2 py-2">Nederlandse naam</th>
          <th className="border border-gray-300 px-2 py-2">Engelse naam</th>
          <th className="border border-gray-300 px-2 py-2">Latijnse naam</th>
          <th className="border border-gray-300 px-2 py-2">Type plant</th>
          <th className="border border-gray-300 px-2 py-2">Bedreigd</th>
          <th className="border border-gray-300 px-2 py-2">Inheems</th>
          <th className="border border-gray-300 px-2 py-2">Eetbaar</th>
          <th className="border border-gray-300 px-2 py-2">Bloemkleur</th>
          <th className="border border-gray-300 px-2 py-2">Bloeimaanden</th>
          <th className="border border-gray-300 px-2 py-2">Groenblijvend</th>
          <th className="border border-gray-300 px-2 py-2">Verwijderen</th>
        </tr>
      </thead>
      <tbody>
        {floraData?.map((plantje: Flora) => (
          <tr key={plantje.latin_name}>
            <td className="border border-gray-300 px-2 py-2">{plantje.id}</td>
            <td className="border border-gray-300 px-2 py-2 font-semibold">{plantje?.dutch_name}</td>
            <td className="border border-gray-300 px-2 py-2 text-gray-600 text-sm">{plantje?.english_name}</td>
            <td className="border border-gray-300 px-2 py-2 italic text-gray-600 text-sm">{plantje.latin_name}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.plant_type}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.be_dreigd}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.in_heems}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.eet_baar}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.bloem_kleur}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.bloei_tijd}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.groen_blijvend}</td>
            <td className="border border-gray-300 px-2 py-2">
              <div onClick={() =>
              dispatch(deletePlant(plantje.id))

            }
            className="flex items-center cursor-pointer group"
          >
            <button className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-2 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              verwijderen
            </button></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      {/* Mobile card view - hidden on desktop */}
      <div className="md:hidden space-y-3">
        {floraData?.map((plantje: Flora) => (
          <div key={plantje.latin_name} className="bg-white rounded-xl p-3 sm:p-4 border-2 border-gray-200">
            <div className="flex gap-3">
              {/* Plant Info */}
              <div className="flex-1">
                <div className="flex items-start mb-1">
                  <h3 className="text-base font-bold text-green-700 flex-1">
                    {plantje?.dutch_name || 'Geen Nederlandse naam'}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">#{plantje.id}</span>
                </div>
                {plantje?.english_name && (
                  <p className="text-sm text-gray-600 mb-1">{plantje.english_name}</p>
                )}
                <p className="text-sm italic text-gray-600 mb-2">{plantje.latin_name}</p>

                <div className="space-y-1">
                  <p className="text-xs text-gray-700">🌿 {plantje?.plant_type}</p>
                  <p className="text-xs text-gray-700">🌸 {plantje?.bloem_kleur}</p>
                  {plantje?.bloei_tijd && (
                    <p className="text-xs text-gray-700"><span className="font-semibold">Bloeitijd:</span> {plantje.bloei_tijd}</p>
                  )}
                  {plantje?.be_dreigd && plantje.be_dreigd !== 'niet bedreigd' && (
                    <p className="text-xs text-red-600 font-semibold">⚠️ {plantje.be_dreigd}</p>
                  )}
                  {plantje?.eet_baar && plantje.eet_baar.toLowerCase() !== 'niet eetbaar' && (
                    <p className="text-xs text-green-600 font-semibold">🍽️ {plantje.eet_baar}</p>
                  )}
                  {plantje?.in_heems && (
                    <p className="text-xs text-gray-700"><span className="font-semibold">Inheems:</span> {plantje.in_heems}</p>
                  )}
                  {plantje?.groen_blijvend && (
                    <p className="text-xs text-gray-700"><span className="font-semibold">Groenblijvend:</span> {plantje.groen_blijvend}</p>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => dispatch(deletePlant(plantje.id))}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-400 bg-red-500 hover:bg-red-600 hover:border-orange-600 transition-colors"
                title="Verwijder uit collectie"
              >
                <IoTrashOutline className="text-white text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;