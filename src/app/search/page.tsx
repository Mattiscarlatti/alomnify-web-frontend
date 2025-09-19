"use client";

import dynamic from "next/dynamic";

const SearchTable = dynamic(() => import("../../components/searchtable"), { ssr: false });

const SearchPage = () => {
  return (
      <div>
        <SearchTable />
      </div>
    );
  };
  
  export default SearchPage;