"use client";
import React from "react";
import Container from "./container";
import Logo from "./logo";
import { IoIosFolderOpen } from "react-icons/io";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import Link from "next/link";

const Header = () => {
  const { floraData } = useSelector((state: StateProps) => state.shopping);

  return (
    <div className="bg-header h-20 top-0 sticky">
      <Container className="h-20 flex items-center md:gap-x-1 justify-between md:justify-start">
        <Logo />
        <div className="w-full items-center gap-x-1 group"> </div>
        {/* Cart button */}
        <Link href={"/cart"}>
          <div className="bg-black hover:bg-slate-950 rounded-full text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-2 sm:px-3 py-1 sm:py-2 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
            <IoIosFolderOpen className="text-gray-300 text-xl" />
            {floraData && floraData.length > 0 && (
            <span className="bg-gray-200 text-darkText rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex items-center justify-center shadow-xl shadow-black">
              {floraData.length}
            </span>
            )}
         </div>
       </Link>
      </Container>
    </div>
  );
};

export default Header;