"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams?.get("payment_intent");

  if (!paymentIntentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600">Er is een fout opgetreden</h2>
          <p className="text-gray-600 mt-2">Geen betalings-ID gevonden</p>
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
          Betaling Succesvol!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Uw betaling is succesvol verwerkt! Uw PlantenCollectie NFT wordt nu gemaakt op de Cardano blockchain. 
          U ontvangt binnen enkele minuten een email met alle details en de transactie hash.
        </p>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2 text-green-800">Wat gebeurt er nu?</h3>
          <ul className="text-sm text-green-700 text-left space-y-1">
            <li>• ✅ Uw betaling is succesvol verwerkt</li>
            <li>• 🚀 Uw PlantenCollectie NFT wordt nu gemint op de blockchain</li>
            <li>• 📧 U ontvangt een email met de transactie hash als bewijs</li>
            <li>• 💎 Uw NFT bevat alle gekozen planten en omgevingsfactoren</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2 text-blue-800">Belangrijk:</h3>
          <ul className="text-sm text-blue-700 text-left space-y-1">
            <li>• Bewaar de email met transactie hash veilig</li>
            <li>• Dit is uw bewijs van eigendom van de PlantenCollectie</li>
            <li>• De transactie is permanent opgeslagen op de blockchain</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="w-full btn btn-outline rounded-full bg-darkText text-slate-100 px-4 py-2 mb-3"
        >
          Terug naar hoofdpagina
        </button>

        <button
          onClick={() => window.location.href = "/plantcollection"}
          className="w-full btn btn-outline rounded-full bg-blue-600 text-white px-4 py-2"
        >
          Bekijk PlantenCollectie Pagina
        </button>

        <div className="mt-6 pt-4 border-t text-sm text-gray-500">
          <p>Betalings-ID: {paymentIntentId}</p>
        </div>
      </div>
    </div>
  );
}