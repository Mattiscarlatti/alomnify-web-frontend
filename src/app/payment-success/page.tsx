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
          Uw betaling is succesvol verwerkt! Uw PlantenCollectie wordt nu opgeslagen. 
          U ontvangt binnen enkele minuten een email met o.a. link naar uw collectie.
        </p>

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