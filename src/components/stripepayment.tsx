"use client";

import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flora, StateProps } from "../../type";
import { resetCart } from "@/redux/shoppingSlice";

const CollectionSubmission = () => {
  const dispatch = useDispatch();
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const listIDs: number[] = floraData?.map((plantje: Flora) => plantje.id);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      alert("Vul alstublieft uw email adres in.");
      return;
    }

    setLoading(true);
    setSubmitStatus("Collectie aanmaken...");

    try {
      // Create free collection via backend server
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://alomnify-api-production.alomnify.workers.dev";
      const response = await fetch(`${backendUrl}/api/collections/create-free`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: listIDs.map(id => ({ id })),
          environmentalOptions: formData,
          contact_info: email,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const { collectionId } = await response.json();

      setSubmitStatus("Collectie succesvol aangemaakt!");

      // Clear cart
      dispatch(resetCart());

      // Redirect to success page
      setTimeout(() => {
        window.location.href = `/submission-success?collection_id=${collectionId}&email=${encodeURIComponent(email)}`;
      }, 1500);

    } catch (error) {
      console.error("Error during submission:", error);
      setSubmitStatus("Er is een fout opgetreden. Probeer het opnieuw.");
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
          Sla deze Plantencollectie op (gratis)
        </button>

        <dialog ref={dialogRef} className="modal bg-white p-6 rounded border-[2px] border-black max-w-md">
          <h2 className="text-xl font-bold mb-4">Sla uw Plantencollectie op</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {submitStatus && (
              <div className="text-center text-sm text-blue-600">
                {submitStatus}
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
                disabled={loading}
              >
                {loading ? "Verwerken..." : "Opslaan (gratis)"}
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default CollectionSubmission;
