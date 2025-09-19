import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="grid grid-cols-2">
        <div className="">
          <Image
              src="/olllogofav.svg"
              alt="logo"
              width={80}
              height={80}
              className="rounded-full"
            />
        </div>
        <div className="pt-2 sm:pt-4">
          <h3 className="text-2xl sm:text-5xl font-semibold text-darkText hover:text-[#00b900] cursor-pointer duration-200">
            Alomnify.nl
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default Logo;