"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const PlantCollectionPage = dynamic(() => import("../../components/plantcollectionpage"), { ssr: false });

const PlantCollection = () => {
  const searchParams = useSearchParams();
  const collectionId = searchParams?.get('id');

  return (
      <div>
        <PlantCollectionPage initialCollectionId={collectionId} />
      </div>
    );
  };
  
  export default PlantCollection;

