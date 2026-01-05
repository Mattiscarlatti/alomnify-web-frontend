"use client";

import { useEffect, useState, useRef } from "react";
import { addToCart } from "@/redux/shoppingSlice";
import { useDispatch } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import { ChartBedreigd } from "@/components/chartbedreigd";
import { ChartEetb } from "@/components/charteetbaar";
import { ChartBloei } from "@/components/chartbloei";
import { ChartPlantTypen } from "@/components/chartplanttypen";
import Banner2 from "@/components/banner2";
import Container from "@/components/container";
import PrintableCollectionReport from './PrintableCollectionReport';
import { Flora, Flora2 } from "../../type";
import '@/app/css/print.css';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

function calculateFactorScore(records: Record<string, number>): number {
  let score = 1;
  const multiplierMap: Record<string, number> = {
    watr: 1.07,
    kalkst: 1.07,
    rommel: 1.07,
  };
  for (const key in records) {
    if (records[key] === 1 && multiplierMap[key]) {
      score *= multiplierMap[key];
    }
  }
  return score;
};

const calculateRecordScore = (flora: Flora2): number => {
  let score = 1;
  if (flora.latin_name.includes("ca. 25 jaar")) {
    score *= 3;
  }
  if (
    ["boom", "conife", "struik"].some((type) => flora.plant_type.includes(type))
  ) {
    score *= 3;
  } else if (flora.plant_type.includes("meerjarig")) {
    score *= 1.5;
  }
  if (flora.in_heems && flora.in_heems.includes("inheems")) {
    score *= 2.5;
  }
  if (flora.be_dreigd && flora.be_dreigd.includes("niet")) {
    score *= 1;
  } else if (flora.be_dreigd && flora.be_dreigd.includes("gevoelig")) {
    score *= 1.5;
  } else if (flora.be_dreigd && flora.be_dreigd.includes("kwetsbaar")) {
    score *= 2;
  } else if (flora.be_dreigd && flora.be_dreigd.includes("ernstig")) {
    score *= 3;
  } else if (flora.be_dreigd && flora.be_dreigd.length > 1) {
    score *= 2.5; 
  }
  return score;
};

const sumList = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

interface PlantCollectionPageProps {
  initialCollectionId?: string | null;
}

const PlantCollectionPage = ({ initialCollectionId }: PlantCollectionPageProps) => {
  const dispatch = useDispatch();
  const printableRef = useRef<HTMLDivElement>(null);
  const [txH, setTxh] = useState("");
  const [inputValue, setInputValue] = useState<string>(initialCollectionId || '');
  const [planTen, setPlanten] = useState<number[]>([]);
  const [floras, setFloras] = useState<Flora2[]>([]);
  const [factors, setFactors] = useState<Record<string, number>>({ watr: 0, kalkst: 0, rommel: 0 });
  const [totalScore, setTotalScore] = useState<number>();
  const [aantal, setAantal] = useState<number>();
  const [aantalBomen, setAantalBomen] = useState<number>();
  const [aantalBomen25, setAantalBomen25] = useState<number>();
  const [aantalGroen, setAantalGroen] = useState<number>();
  const [aantalEetbaar, setAantalEetbaar] = useState<number>();
  const [aantalType, setAantalType] = useState<{ name: string; value: number }[]>([]);
  const [aantalBedreigd, setAantalBedreigd] = useState< { name: string; value: number}[]>([])
  const [aantalBedreigd2, setAantalBedreigd2] = useState<number>();
  const [aantalErnstigB, setAantalErnstigB] = useState<number>();
  const [aantalKwetsbaar, setAantalKwetsbaar] = useState<number>();
  const [aantalGevoelig, setAantalGevoelig] = useState<number>();
  const [aantalInh, setAantalInh] = useState<number>();
  const [aantalBloei, setAantalBloei] = useState< { name: string; value: number}[]>([]);
  const [aantalEet, setAantalEet] = useState< { name: string; value: number}[]>([]);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'statistics' | 'photos'>('statistics');
  const [plantPhotos, setPlantPhotos] = useState<Record<number, string>>({});
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [plantsWithoutPhotos, setPlantsWithoutPhotos] = useState<Flora2[]>([]);
  const [isExampleCollection, setIsExampleCollection] = useState(false);
  const [photosLoadedCount, setPhotosLoadedCount] = useState(0);
  const PHOTOS_PER_BATCH = 25;

  const handleClick2 = () => {
    setTxh(inputValue);
    setIsExampleCollection(false); // Reset example flag when loading custom collection
    fetchMetadata(inputValue);
  };

  const handleLoadExampleCollection = () => {
    const exampleId = 'e1luf6vVAq9FVGYfS9woaenFTTFVoSMgQbogNZwl3FjZnNGUAhf9G2L5DhhAf115';
    setInputValue(exampleId);
    setTxh(exampleId);
    setIsExampleCollection(true); // Mark as example collection
    fetchMetadata(exampleId);
  };

  const handleSaveCollection = () => {
    if (isExampleCollection) {
      alert('De voorbeeldcollectie kan niet worden opgeslagen. Maak uw eigen collectie aan om deze op te slaan in uw folder.');
      return;
    }
    handleAPI2(floras);
  };

  const reactToPrintFn = useReactToPrint({
    contentRef: printableRef,
    documentTitle: `Plantencollectie_${txH}_${new Date().toISOString().split('T')[0]}`,
  });

  const handlePrintPDF = async () => {
    // Give charts time to render
    await new Promise((resolve) => setTimeout(resolve, 500));
    reactToPrintFn();
  };

  useEffect(() => {
    if (txH) {
      fetchMetadata(txH);
    }
  }, [txH]);

  // Auto-load collection if initialCollectionId is provided
  useEffect(() => {
    if (initialCollectionId) {
      fetchMetadata(initialCollectionId);
    }
  }, [initialCollectionId]);

  const calculateStatsFromPlants = (jsonObject: Flora2[], factors: Record<string, number>) => {
    console.log('🎯 calculateStatsFromPlants called with:', {
      plantsCount: jsonObject?.length || 0,
      factors,
      firstPlant: jsonObject?.[0]
    });

    const scoreListx = jsonObject.map((x) => (calculateRecordScore(x)));
    const scoreListy = scoreListx.map((x) => (1+(x/10)))
    const recordsum = sumList(scoreListy);
    const factorsum = calculateFactorScore(factors);
    const totalsum = Math.round(recordsum**factorsum);
    setTotalScore(totalsum);
    const aantalplanten = jsonObject.length;
    setAantal(aantalplanten);
    const aantalboom = jsonObject.filter(obj => obj.plant_type === "boom");
    const aantalfruitboom = jsonObject.filter(obj => obj.plant_type === "fruitboom");
    const aantalconiferen = jsonObject.filter(obj => obj.plant_type === "coniferen");
    const aantalboo = aantalboom.length;
    const aantalfrui = aantalfruitboom.length;
    const aantalcon = aantalconiferen.length;
    const aantalBom = aantalboo + aantalfrui + aantalcon;
    setAantalBomen(aantalBom);
    // Debug: check for ouder dan ca. 25 jaar in latin names
    const met25 = jsonObject.filter(obj => obj.latin_name.includes("ouder dan ca. 25 jaar"));
    console.log('Planten met "ouder dan ca. 25 jaar":', met25.map(p => p.latin_name));
    const aantalBom25 = jsonObject.filter(obj => obj.latin_name.includes("ouder dan ca. 25 jaar"));
    const aantalB25 = aantalBom25.length;
    console.log('Aantal bomen 25+:', aantalB25);
    setAantalBomen25(aantalB25);
    const aantalGroenBl = jsonObject.filter(obj => obj.groen_blijvend === "groenblijvend");
    const aantalGroenB = aantalGroenBl.length;
    setAantalGroen(aantalGroenB);
    // Debug: check eet_baar values
    const eetbaarValues = jsonObject.map(obj => ({ id: obj.id, eetbaar: obj.eet_baar, trimmed: obj.eet_baar?.trim() }));
    console.log('Eetbaar sample (first 5):', eetbaarValues.slice(0, 5));
    const aantalEetb = jsonObject.filter(obj => {
      const trimmed = obj.eet_baar?.trim();
      return trimmed && trimmed.toLowerCase() !== "niet eetbaar";
    });
    const aantalEetba = aantalEetb.length;
    console.log('Aantal eetbaar (method 1):', aantalEetba);
    setAantalEetbaar(aantalEetba);
    const plantTypeCounts = jsonObject.reduce<Record<string, number>>((acc, flor) => {
      acc[flor.plant_type] = (acc[flor.plant_type] || 0) + 1;
      return acc;
    }, {});
    const formattedPlantTypeCounts: { name: string; value: number }[] =
      Object.entries(plantTypeCounts).map(([key, value]) => ({
        name: key,
        value: value as number,
    }));
    const sortedPTCounts = [...formattedPlantTypeCounts].sort((a, b) => b.value - a.value);
    setAantalType(sortedPTCounts);
    const plantEndangeredCounts = jsonObject.reduce<Record<string, number>>((acc, flor) => {
      acc[flor.be_dreigd] = (acc[flor.be_dreigd] || 0) + 1;
      return acc;
    }, {});
    delete plantEndangeredCounts[""];
    delete plantEndangeredCounts["lang geleden verwilderd"];
    const formattedEndangeredCounts = Object.entries(plantEndangeredCounts).map(([key, value]) => ({
      name: key,
      value: value
    }));
    setAantalBedreigd(formattedEndangeredCounts);
    const aantalBedr = jsonObject.filter(obj => obj.be_dreigd === "bedreigd");
    const aantalBedrei = aantalBedr.length;
    setAantalBedreigd2(aantalBedrei);
    const aantalEBedr = jsonObject.filter(obj => obj.be_dreigd === "ernstig bedreigd");
    const aantalEBedrei = aantalEBedr.length;
    setAantalErnstigB(aantalEBedrei);
    const aantalKwets = jsonObject.filter(obj => obj.be_dreigd === "kwetsbaar");
    const aantalKwetsb = aantalKwets.length;
    setAantalKwetsbaar(aantalKwetsb);
    const aantalGev = jsonObject.filter(obj => obj.be_dreigd === "gevoelig");
    const aantalGevoe = aantalGev.length;
    setAantalGevoelig(aantalGevoe);
    // Debug: check what values exist for in_heems
    const inHeemsValues = [...new Set(jsonObject.map(obj => obj.in_heems))];
    console.log('Unique in_heems values:', inHeemsValues);
    const aantalInhee = jsonObject.filter(obj => obj.in_heems === "inheems");
    const aantalInhe = aantalInhee.length;
    console.log('Aantal inheems (method 1):', aantalInhe);
    setAantalInh(aantalInhe);
    const aantallen1 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 1 "));
    const aantalle1 = aantallen1.length;
    const aantallen2 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 2"));
    const aantalle2 = aantallen2.length;
    const aantallen3 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 3"));
    const aantalle3 = aantallen3.length;
    const aantallen4 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 4"));
    const aantalle4 = aantallen4.length;
    const aantallen5 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 5"));
    const aantalle5 = aantallen5.length;
    const aantallen6 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 6"));
    const aantalle6 = aantallen6.length;
    const aantallen7 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 7"));
    const aantalle7 = aantallen7.length;
    const aantallen8 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 8"));
    const aantalle8 = aantallen8.length;
    const aantallen9 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 9"));
    const aantalle9 = aantallen9.length;
    const aantallen10 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 10"));
    const aantalle10 = aantallen10.length;
    const aantallen11 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 11"));
    const aantalle11 = aantallen11.length;
    const aantallen12 = jsonObject.filter(obj => obj.bloei_tijd.includes(" 12"));
    const aantalle12 = aantallen12.length;
    const aantallenBloei = [
      { name: "januari", value: aantalle1 },
      { name: "februari", value: aantalle2 },
      { name: "maart", value: aantalle3 },
      { name: "april", value: aantalle4 },
      { name: "mei", value: aantalle5 },
      { name: "juni", value: aantalle6 },
      { name: "juli", value: aantalle7 },
      { name: "augustus", value: aantalle8 },
      { name: "september", value: aantalle9 },
      { name: "oktober", value: aantalle10 },
      { name: "november", value: aantalle11 },
      { name: "december", value: aantalle12 }
    ];
    setAantalBloei(aantallenBloei);
    const aantallenBlad = jsonObject.filter(obj => obj.eet_baar.includes("bladeren"));
    const aantalleBlad = aantallenBlad.length;
    const aantallenBloem = jsonObject.filter(obj => obj.eet_baar.includes("bloemen"));
    const aantalleBloem = aantallenBloem.length;
    const aantallenZaad = jsonObject.filter(obj => obj.eet_baar.includes("zaden"));
    const aantalleZaad = aantallenZaad.length;
    const aantallenJongSch = jsonObject.filter(obj => obj.eet_baar.includes("jonge scheuten"));
    const aantalleJongSch = aantallenJongSch.length;
    const aantallenStamBin = jsonObject.filter(obj => obj.eet_baar.includes("stam"));
    const aantalleStamBin = aantallenStamBin.length;
    const aantallenSap = jsonObject.filter(obj => obj.eet_baar.includes("sap"));
    const aantalleSap = aantallenSap.length;
    const aantallenVrucht = jsonObject.filter(obj => obj.eet_baar.includes("vruchten"));
    const aantalleVrucht = aantallenVrucht.length;
    const aantallenOlie = jsonObject.filter(obj => obj.eet_baar.includes("olie"));
    const aantalleOlie = aantallenOlie.length;
    const aantallenWortel = jsonObject.filter(obj => obj.eet_baar.includes("wortels"));
    const aantalleWortel = aantallenWortel.length;
    const aantallenSteng = jsonObject.filter(obj => obj.eet_baar.includes("stengel"));
    const aantalleSteng = aantallenSteng.length;
    const aantallenBoon = jsonObject.filter(obj => obj.eet_baar.includes("boon"));
    const aantalleBoon = aantallenBoon.length;
    const aantallenEet = [
      { name: "vruchten", value: aantalleVrucht },
      { name: "zaden", value: aantalleZaad },
      { name: "bonen", value: aantalleBoon },
      { name: "bloemen", value: aantalleBloem },
      { name: "bladeren", value: aantalleBlad },
      { name: "wortels", value: aantalleWortel },
      { name: "sap", value: aantalleSap },
      { name: "olie", value: aantalleOlie },
      { name: "jonge scheuten", value: aantalleJongSch },
      { name: "stengels", value: aantalleSteng },
      { name: "stam (binnenkant)", value: aantalleStamBin }
    ];
    setAantalEet(aantallenEet);
  };

  const fetchMetadata = async (collectionId: string) => {
    setError(''); // Clear previous errors
    try {
        const response = await fetch(`https://alomnify-api-production.alomnify.workers.dev/api/collections?id=${collectionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Collectie niet gevonden. Controleer of het collectie ID correct is.');
          } else if (response.status === 400) {
            throw new Error('Ongeldig collectie ID formaat.');
          } else {
            throw new Error(`Er is een fout opgetreden bij het ophalen van de collectie (Error: ${response.status}).`);
          }
        }

        const data = await response.json();
        const collection = data.collection;

        console.log('🔍 Collection data received:', {
          hasCollection: !!collection,
          plantIdsCount: collection?.plantIds?.length || 0,
          plantsCount: collection?.plants?.length || 0,
          firstPlant: collection?.plants?.[0]
        });

        if (!collection) {
          throw new Error('Geen collectiegegevens ontvangen.');
        }

        if (!collection.plants || collection.plants.length === 0) {
          throw new Error('Geen planten in collectie gevonden.');
        }

        // Backend now returns plants array directly, no need to fetch each plant separately
        setPlanten(collection.plantIds);
        setFloras(collection.plants); // Use the plants data from the collection response
        setFactors(collection.environmentalFactors);

        console.log('✅ Calling calculateStatsFromPlants with', collection.plants.length, 'plants');

        // Calculate stats immediately with the plants data
        calculateStatsFromPlants(collection.plants, collection.environmentalFactors);
      } catch (error: any) {
        console.error('Error fetching collection:', error);
        setError(error.message || 'Er is een onbekende fout opgetreden bij het laden van de collectie.');
    }
  };
  
  // Note: The old useEffect that fetched plants individually has been removed
  // The backend now returns all plant data in the collection response

  const convertToFlora = (data: any): Flora => ({
    id: data.id,
    latin_name: data.latin_name,
    dutch_name: data.dutch_name,
    english_name: data.english_name,
    plant_type: data.plant_type,
    eet_baar: data.eet_baar,
    bloei_tijd: data.bloei_tijd,
    bloem_kleur: data.bloem_kleur,
    groen_blijvend: data.groen_blijvend,
    in_heems: data.in_heems,
    be_dreigd: data.be_dreigd,
  });

  // Fetch plant photo from Flickr API
  const fetchPlantPhoto = async (plantName: string) => {
    const apiKey = process.env.NEXT_PUBLIC_FLICKR_KEY;

    if (!apiKey) {
      console.error('Flickr API key not found');
      return null;
    }

    try {
      // Search for photos using the plant's latin name
      const searchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(plantName)}&sort=relevance&per_page=1&format=json&nojsoncallback=1&content_type=1&media=photos`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.photos && data.photos.photo && data.photos.photo.length > 0) {
        const photo = data.photos.photo[0];
        // Construct photo URL: https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
        const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
        return photoUrl;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching photo for ${plantName}:`, error);
      return null;
    }
  };

  // Load photos in batches
  const loadMorePhotos = async () => {
    if (photosLoadedCount >= floras.length) return;

    setLoadingPhotos(true);

    const startIndex = photosLoadedCount;
    const endIndex = Math.min(photosLoadedCount + PHOTOS_PER_BATCH, floras.length);
    const batch = floras.slice(startIndex, endIndex);

    try {
      const results = await Promise.all(
        batch.map(async (plant) => {
          const photoUrl = await fetchPlantPhoto(plant.latin_name);
          return { id: plant.id, url: photoUrl, plant };
        })
      );

      setPlantPhotos(prev => {
        const newPhotos = { ...prev };
        results.forEach(({ id, url }) => {
          if (url) newPhotos[id] = url;
        });
        return newPhotos;
      });

      setPlantsWithoutPhotos(prev => {
        const newList = [...prev];
        results.forEach(({ url, plant }) => {
          if (!url && !prev.find(p => p.id === plant.id)) {
            newList.push(plant);
          }
        });
        return newList;
      });

      setPhotosLoadedCount(endIndex);
    } catch (error) {
      console.error('Error loading photo batch:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  // Auto-load first batch when switching to photos tab
  useEffect(() => {
    if (activeTab === 'photos' && floras.length > 0 && photosLoadedCount === 0) {
      loadMorePhotos();
    }
  }, [activeTab, floras]);

  const handleAPI2 = (lijst: Flora2[]) => {
    lijst.map(x => dispatch(addToCart(convertToFlora(x))));
  };

  return (
    <Container>
    <div className="grid grid-cols-1 gap-6 bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      { txH &&
        <div className="grid grid-cols-4 px-3 py-2">
          <p className="flex flex-col col-span-4 rounded-l-xl items-center justify-center gap-x-1 px-3 py-1">De resultaten worden getoond van PlantenCollectie ID: {txH}</p>
        </div>
      }

      {/* Error message display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Fout bij het laden van de collectie:</strong> {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-0 px-3 py-2">
        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Voer uw 64-karakter collectie ID in..."
          className="text-center text-xs sm:text-base px-2 sm:px-3 py-3 border-[2px] border-gray-400 hover:border-orange-600 focus:border-orange-600 duration-200 rounded-t-xl outline-none"
          name="inputtxh"
        />

        {/* Load collection button */}
        <button
          onClick={handleClick2}
          className="bg-black hover:bg-slate-950 text-xs sm:text-base text-slate-100 hover:text-white flex items-center justify-center px-2 sm:px-3 py-3 border-[2px] border-t-0 border-gray-400 hover:border-orange-600 duration-200"
        >
          Laad Collectie
        </button>

        {/* Update/add to folder button */}
        <button
          onClick={handleSaveCollection}
          disabled={isExampleCollection}
          className={`text-xs sm:text-base flex items-center justify-center px-2 sm:px-3 py-3 border-[2px] border-t-0 border-gray-400 duration-200 ${
            isExampleCollection
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-black hover:bg-slate-950 text-slate-100 hover:text-white hover:border-orange-600'
          }`}
          title={isExampleCollection ? 'Voorbeeldcollectie kan niet worden opgeslagen' : 'Sla collectie op in uw folder'}
        >
          Wijzig Collectie/Sla op
        </button>

        {/* Load example collection button */}
        <button
          onClick={handleLoadExampleCollection}
          className="bg-green-700 rounded-b-xl hover:bg-green-800 text-xs sm:text-base text-slate-100 hover:text-white flex items-center justify-center px-2 sm:px-3 py-3 border-[2px] border-t-0 border-gray-400 hover:border-orange-600 duration-200"
        >
          Laad Voorbeeldcollectie
        </button>
      </div>

      {/* PDF Download button */}
      { aantal !== undefined && (
        <button
          onClick={handlePrintPDF}
          className="mt-4 w-full bg-black hover:bg-slate-950 text-slate-100 hover:text-white flex items-center justify-center px-3 py-3 rounded-lg transition-colors"
        >
          Download PDF Rapport
        </button>
      )}

      {/* Tab Navigation */}
      { aantal !== undefined && (
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('statistics')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'statistics'
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Statistieken
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'photos'
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Fotoimpressie
          </button>
        </div>
      )}

      {/* Statistics Tab Content */}
      { aantal !== undefined && activeTab === 'statistics' &&
        <div className="relative w-full h-[200px] flex items-center bg-gray-200">
        <Banner2
            plantendata0={{
              aantalPlantenSoorten: aantal as number,
              aantalInheemseSoorten: aantalInh as number,
              aantalBoomSoorten: aantalBomen as number,
              aantalBoomSoorten25: aantalBomen25 as number,
              aantalEetbareSoorten: aantalEetbaar as number,
              aantalGroenblijvendeSoorten: aantalGroen as number,
              aantalGevoeligeSoorten: aantalGevoelig as number,
              aantalKwetsbareSoorten: aantalKwetsbaar as number,
              aantalBedreigdeSoorten: aantalBedreigd2 as number,
              aantalErnstigBedreigdeSoorten: aantalErnstigB as number,
              biodiversiteitsScore: totalScore as number
            }}
      /></div>
      }
      { aantal !== undefined && activeTab === 'statistics' &&
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-2 pb-28"><p className="">Bloeiende Planten</p><ChartBloei plantendata4={aantalBloei as any[]} /></div>
          <div className="flex flex-col items-center justify-center gap-2 pb-28"><p className="">Kwetsbaarheid van Inheemsen</p><ChartBedreigd plantendata3={aantalBedreigd as any[]} /></div>
          <div className="flex flex-col items-center justify-center gap-2 pb-14"><p className="">Eetbare Planten</p><ChartEetb plantendata5={aantalEet as any[]} /></div>
          <div className="flex flex-col items-center justify-center gap-2 pb-14"><p className="">Type Planten</p><ChartPlantTypen plantendata1={aantalType as any[]} /></div>
        </div>
      }
      { aantal !== undefined && activeTab === 'statistics' &&
        <div>
          <table className="table-auto border-collapse border border-gray-400 w-full text-left">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-2">Nr</th>
                <th className="border border-gray-300 px-2 py-2">Latijnse naam</th>
                <th className="border border-gray-300 px-2 py-2">Nederlandse naam</th>
                <th className="border border-gray-300 px-2 py-2">Type plant</th>
                <th className="border border-gray-300 px-2 py-2">Bedreigd</th>
                <th className="border border-gray-300 px-2 py-2">Inheems</th>
                <th className="border border-gray-300 px-2 py-2">Eetbaar</th>
                <th className="border border-gray-300 px-2 py-2">Bloeimaanden</th>
                <th className="border border-gray-300 px-2 py-2">Groenblijvend</th>
              </tr>
            </thead>
            <tbody>
              {floras.map((flor) => (
                <tr key={flor.id}>
                  <td className="border border-gray-300 px-2 py-2">{flor.id}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor.latin_name}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.dutch_name}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.plant_type}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.be_dreigd}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.in_heems}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.eet_baar}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.bloei_tijd}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.groen_blijvend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      {/* Photos Tab Content */}
      { aantal !== undefined && activeTab === 'photos' && (
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Fotoimpressie van uw Plantencollectie</h2>

          {loadingPhotos && (
            <div className="text-center mb-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              <p className="text-gray-600 mt-2">
                Foto's worden geladen via Flickr... ({photosLoadedCount}/{floras.length})
              </p>
            </div>
          )}

          {/* Photo Gallery */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            {floras.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {floras
                  .filter((plant) => plantPhotos[plant.id])
                  .map((plant) => (
                    <div key={plant.id} className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={plantPhotos[plant.id]}
                          alt={plant.dutch_name || plant.latin_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold text-gray-900 text-sm">{plant.dutch_name}</h3>
                        <p className="text-xs text-gray-600 italic">{plant.latin_name}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Geen planten gevonden in deze collectie</p>
            )}
          </div>

          {/* Load More Button */}
          {photosLoadedCount < floras.length && !loadingPhotos && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMorePhotos}
                className="bg-black hover:bg-slate-950 text-slate-100 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Laad Meer Foto's ({photosLoadedCount}/{floras.length} geladen)
              </button>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 mt-4">
            Foto's afkomstig van Flickr.
          </p>

          {/* Show plants without photos */}
          {!loadingPhotos && plantsWithoutPhotos.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    <strong>Let op:</strong> Voor de volgende {plantsWithoutPhotos.length} {plantsWithoutPhotos.length === 1 ? 'plant' : 'planten'} kon geen foto worden geladen: {' '}
                    {plantsWithoutPhotos.map((plant, index) => (
                      <span key={plant.id}>
                        {plant.dutch_name || plant.latin_name}
                        {index < plantsWithoutPhotos.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden printable version */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <PrintableCollectionReport
          ref={printableRef}
          floras={floras}
          statistics={{
            totalScore: totalScore || 0,
            aantal: aantal || 0,
            aantalBomen: aantalBomen || 0,
            aantalBomen25: aantalBomen25 || 0,
            aantalGroen: aantalGroen || 0,
            aantalEetbaar: aantalEetbaar || 0,
            aantalBedreigd2: aantalBedreigd2 || 0,
            aantalErnstigB: aantalErnstigB || 0,
            aantalKwetsbaar: aantalKwetsbaar || 0,
            aantalGevoelig: aantalGevoelig || 0,
            aantalInh: aantalInh || 0,
          }}
          chartData={{
            aantalType,
            aantalBloei,
            aantalBedreigd,
            aantalEet,
          }}
          collectionId={txH}
        />
      </div>
    </div>
    </Container>
  );
}

export default PlantCollectionPage;