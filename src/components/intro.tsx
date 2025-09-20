"use client"

import Container from "@/components/container";
import Youtube1 from "@/components/youtube1";
import Banner1 from "@/components/banner1";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface IntroProps {
  collectionId?: string;
}

const Intro = ({ collectionId }: IntroProps) => {
  const router = useRouter();

  useEffect(() => {
    if (collectionId) {
      // Redirect to plant collection page with the collection ID
      router.push(`/plantcollection?id=${collectionId}`);
    }
  }, [collectionId, router]);
  
  return (
    <>
      <Banner1 />
      <Container>
        <div className="Container p-3 sm:p-12 shadow-xl ring-1 rounded-lg backdrop-blur-lg mx-auto w-full">
          <p className="text-center px-3 pt-20 pb-7 text-m sm:text-3xl text-header font-bold overline">Hoe werkt het? Een stap-voor-stap uitleg.</p>
          <Youtube1 />
        </div>
        <div>
          <p className="px-3 pt-3 text-xl">Disclaimers:</p>
          <p className="px-3 text-sm">Deze site vermeldt de eetbaarheid van allerlei planten, maar deze eetbaarheidsinformatie is niet gecontroleerd. 
            Ga daarom niet blind uit van deze informatie, maar voer altijd een dubbele check uit (d.w.z. controleer betrouwbare bronnen), voordat u 
            besluit tot het eten van plantenmateriaal.</p>
        </div>
      </Container>
    </>
  );
};

export default Intro;