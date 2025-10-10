"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentCanceled() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams?.get("payment_intent");
  const redirectStatus = searchParams?.get("redirect_status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-orange-500 text-6xl mb-4">
          ⚠️
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-orange-600">
          Betaling Geannuleerd
        </h1>
        
        <p className="text-gray-600 mb-6">
          Uw betaling is geannuleerd. Er zijn geen kosten in rekening gebracht.
        </p>

        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-2">Wat gebeurt er nu?</h3>
          <ul className="text-sm text-orange-700 text-left space-y-1">
            <li>• Uw plantencollectie is niet opgeslagen</li>
            <li>• Er zijn geen kosten in rekening gebracht</li>
            <li>• U kunt de betaling opnieuw proberen</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="w-full btn btn-outline rounded-full bg-darkText text-slate-100 px-4 py-2 mb-3"
        >
          Terug naar hoofdpagina
        </button>

        <button
          onClick={() => window.history.back()}
          className="w-full btn btn-outline rounded-full bg-orange-600 text-white px-4 py-2"
        >
          Probeer opnieuw
        </button>

        {paymentIntentId && (
          <div className="mt-6 pt-4 border-t text-sm text-gray-500">
            <p>Betalings-ID: {paymentIntentId}</p>
            {redirectStatus && <p>Status: {redirectStatus}</p>}
          </div>
        )}
      </div>
    </div>
  );
}