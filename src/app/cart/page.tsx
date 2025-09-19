"use client";

import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../../type";
import { resetCart } from "@/redux/shoppingSlice";
import Container from "@/components/container";
import CartItem from "@/components/cartItem";
import Link from "next/link";

const CartPage = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();
  return (
    <Container>
      {floraData.length > 0 ? (
        <Container>
          <div className="flex flex-col gap-5">
            <CartItem />
            <div className="flex items-center justify-end">
              <button
                onClick={() => dispatch(resetCart())}
                className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-2 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative"
              >
                delete alle planten
              </button>
            </div>
          </div>
        </Container>
      ) : (
        <div className="flex flex-col gap-y-6 items-center justify-center bg-white h-96 px-4 rounded">
          <p className="border-[1px] border-orange-600 w-full p-2 text-center">
            Uw collectie is leeg op dit moment
          </p>
          <Link href={"/"}>
            <button className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-2 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              Terug naar Home
            </button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default CartPage;