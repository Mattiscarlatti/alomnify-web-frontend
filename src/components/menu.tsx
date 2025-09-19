import Link from "next/link";

const Menu = () => {
    return (
        <div className="bg-black hover:bg-slate-950 text-slate-100 hover:text-white flex items-center justify-center gap-x-1 py-1 h-10 top-20 sticky">
          <Link href={"/search"} className="h-9 rounded-full text-center text-xs sm:text-sm hover:text-white flex items-center justify-center gap-x-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              Verzamel Collectie
          </Link>
          <Link href={"/cart"} className="h-9 rounded-full text-center text-xs sm:text-sm hover:text-white flex items-center justify-center gap-x-1 px-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              Leg Collectie Vast
          </Link>
          <Link href={"/plantcollection"} className="h-9 rounded-full text-center text-xs sm:text-sm hover:text-white flex items-center justify-center gap-x-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              Show Collectie
          </Link>
          <Link href={"/about"} className="h-9 rounded-full text-center text-xs sm:text-sm hover:text-white flex items-center justify-center gap-x-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              Over Alomnify
          </Link>
          <Link href={"/contact"} className="h-9 rounded-full text-center text-xs sm:text-sm hover:text-white flex items-center justify-center gap-x-1 px-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
              Contact
          </Link>
        </div>
      );
    };
    
    export default Menu;