"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentFailed() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams?.get("payment_intent");
  const errorType = searchParams?.get("error_type");
  const errorMessage = searchParams?.get("error_message");

  const getErrorTitle = () => {
    switch (errorType) {
      case 'insufficient_funds':
        return 'Onvoldoende Saldo';
      case 'card_declined':
        return 'Betaling Geweigerd';
      case 'authentication_required':
        return 'Authenticatie Vereist';
      default:
        return 'Betaling Mislukt';
    }
  };

  const getErrorDescription = () => {
    switch (errorType) {
      case 'insufficient_funds':
        return 'Er staat onvoldoende saldo op uw rekening om deze betaling te voltooien.';
      case 'card_declined':
        return 'Uw bank heeft de betaling geweigerd. Controleer uw gegevens en probeer het opnieuw.';
      case 'authentication_required':
        return 'Extra authenticatie is vereist om deze betaling te voltooien.';
      default:
        return 'Er is een fout opgetreden tijdens het verwerken van uw betaling.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">
          ❌
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          {getErrorTitle()}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {getErrorDescription()}
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Technische details:</h3>
            <p className="text-sm text-red-700">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Wat kunt u doen?</h3>
          <ul className="text-sm text-blue-700 text-left space-y-1">
            <li>• Controleer uw rekeninggegevens</li>
            <li>• Zorg voor voldoende saldo</li>
            <li>• Probeer een andere betaalmethode</li>
            <li>• Neem contact op met uw bank</li>
          </ul>
        </div>

        <button
          onClick={() => window.history.back()}
          className="w-full btn btn-outline rounded-full bg-darkText text-slate-100 px-4 py-2 mb-3"
        >
          Probeer opnieuw
        </button>

        <button
          onClick={() => window.location.href = "/"}
          className="w-full btn btn-outline rounded-full bg-gray-500 text-white px-4 py-2"
        >
          Terug naar hoofdpagina
        </button>

        {paymentIntentId && (
          <div className="mt-6 pt-4 border-t text-sm text-gray-500">
            <p>Betalings-ID: {paymentIntentId}</p>
            {errorType && <p>Error type: {errorType}</p>}
          </div>
        )}
      </div>
    </div>
  );
}