"use client";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Flora, StateProps } from "../../type";
import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;


const StripePayment = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const listIDs: number[] = floraData?.map((plantje: Flora) => plantje.id);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    watr: false,
    kalkst: false,
    rommel: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripePublishableKey) {
      setPaymentStatus("Stripe is niet geconfigureerd. Neem contact op met de beheerder.");
      return;
    }
    
    if (!email) {
      alert("Vul alstublieft uw email adres in.");
      return;
    }

    setLoading(true);
    setPaymentStatus("Betaling initiëren...");

    try {
      // Create payment intent via backend server
      const response = await fetch("https://alomnify-api-staging.alomnify.workers.dev/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: listIDs.map(id => ({ id })),
          customerEmail: email,
          environmentalOptions: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const { client_secret, payment_intent_id } = await response.json();

      // Redirect to Stripe payment page
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe kon niet worden geladen");
      }

      setPaymentStatus("Doorverwijzen naar betaling...");
      
      const { error } = await stripe.confirmIdealPayment(client_secret, {
        payment_method: {
          ideal: {},
          billing_details: {
            email: email,
          },
        },
        return_url: `${window.location.origin}/payment-success?payment_intent=${payment_intent_id}`,
      });

      if (error) {
        console.error("Payment failed:", error);
        setPaymentStatus(`Betaling mislukt: ${error.message}`);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentStatus("Er is een fout opgetreden tijdens de betaling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 w-full">
      <div className="flex flex-col items-center gap-3 sm:gap-6 lg:gap-8">
        <button 
          className="btn btn-outline rounded-full bg-darkText text-slate-100 px-2 py-2 text-sm flex items-center border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative"
          onClick={() => dialogRef.current?.showModal()}
        >
          Bestel deze Plantencollectie (€2,99)
        </button>
        
        <dialog ref={dialogRef} className="modal bg-white p-6 rounded border-[2px] border-black max-w-md">
          <h2 className="text-xl font-bold mb-4">Bestel uw Plantencollectie</h2>
          
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email adres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="uw@email.nl"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Aanwezig bij deze plantencollectie:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="watr"
                    checked={formData.watr}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm">Stromend water</span>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="kalkst"
                    checked={formData.kalkst}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm">Veel kalk (= kalkrijk)</span>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="rommel"
                    checked={formData.rommel}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm">Rommelige hoekjes</span>
                </label>
              </div>
            </div>

            {paymentStatus && (
              <div className="text-center text-sm text-blue-600">
                {paymentStatus}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                className="btn btn-outline rounded-full bg-gray-500 text-white px-4 py-2 text-sm"
                onClick={() => dialogRef.current?.close()}
                disabled={loading}
              >
                Annuleren
              </button>
              <button 
                type="submit" 
                className="btn btn-outline rounded-full bg-darkText text-slate-100 px-4 py-2 text-sm border-[2px] border-gray-400 hover:border-orange-600 duration-200"
                disabled={loading || !stripePublishableKey}
              >
                {!stripePublishableKey 
                  ? "Stripe niet geconfigureerd" 
                  : loading 
                    ? "Verwerken..." 
                    : "Betaal €2,99 met iDEAL"
                }
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default StripePayment;