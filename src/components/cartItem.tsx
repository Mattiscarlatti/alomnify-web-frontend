import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flora, StateProps } from "../../type";
import { deletePlant } from "@/redux/shoppingSlice";
import dynamic from "next/dynamic";

const StripePayment = dynamic(() => import("../components/stripepayment").then((mod) => mod.default), { ssr: false });

const CartItem = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();
  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      <StripePayment />
      <div className="items-center justify-between font-semibold bg-white rounded p-2 w-full">
        <p className="w-1/3">Planten</p>
      </div>
      <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-2">Nr</th>
          <th className="border border-gray-300 px-2 py-2">Latijnse naam</th>
          <th className="border border-gray-300 px-2 py-2">Nederlandse naam</th>
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
            <td className="border border-gray-300 px-2 py-2">{plantje.latin_name}</td>
            <td className="border border-gray-300 px-2 py-2">{plantje?.dutch_name}</td>
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
    </div>
  );
};

export default CartItem;