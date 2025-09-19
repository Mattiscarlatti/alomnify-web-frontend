"use client";

import dynamic from "next/dynamic";

const PlantCollectionPage = dynamic(() => import("../../components/plantcollectionpage"), { ssr: false });

const PlantCollection = () => {
  return (
      <div>
        <PlantCollectionPage />
      </div>
    );
  };
  
  export default PlantCollection;

