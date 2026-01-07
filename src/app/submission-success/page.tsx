"use client";

import { useSearchParams } from "next/navigation";

export default function SubmissionSuccess() {
  const searchParams = useSearchParams();
  const collectionId = searchParams?.get("collection_id");
  const email = searchParams?.get("email");

  if (!collectionId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600">Er is een fout opgetreden</h2>
          <p className="text-gray-600 mt-2">Geen collectie-ID gevonden</p>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-4 btn btn-outline rounded-full bg-darkText text-slate-100 px-4 py-2"
          >
            Terug naar hoofdpagina
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Collectie Opgeslagen!
        </h1>

        <p className="text-gray-600 mb-6">
          Uw Plantencollectie is succesvol aangemaakt en opgeslagen!
        </p>

        {email && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ Email verzonden!</h3>
            <p className="text-sm text-green-700 mb-3">
              U ontvangt binnen enkele minuten een email op <strong>{email}</strong> met uw collectie-ID
              en instructies voor het bekijken van uw plantencollectie.
            </p>
            <p className="text-sm text-green-700">
              Controleer ook uw spam/junk folder als u de email niet direct ziet.
            </p>
          </div>
        )}

        {!email && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Geen email opgegeven</h3>
            <p className="text-sm text-yellow-700 mb-3">
              Uw collectie is succesvol aangemaakt. Ga naar de <strong>PlantenCollectie</strong> pagina
              en gebruik uw collectie-ID om uw collectie op te vragen.
            </p>
            <p className="text-sm text-yellow-700">
              Collectie-ID: <code className="bg-yellow-200 px-1 rounded break-all">{collectionId}</code>
            </p>
          </div>
        )}

        <button
          onClick={() => window.location.href = "/"}
          className="w-full btn btn-outline rounded-full bg-darkText text-slate-100 px-4 py-2 mb-3"
        >
          Terug naar hoofdpagina
        </button>

        <button
          onClick={() => window.location.href = `/plantcollection?id=${collectionId}`}
          className="w-full btn btn-outline rounded-full bg-blue-600 text-white px-4 py-2"
        >
          Ga naar Collectie Pagina
        </button>

        <div className="mt-6 pt-4 border-t text-sm text-gray-500">
          <p className="break-all">Collectie-ID: {collectionId}</p>
          {email && <p className="break-all">Email: {email}</p>}
        </div>
      </div>
    </div>
  );
}
