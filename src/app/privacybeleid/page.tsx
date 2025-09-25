"use client";

export default function PrivacybeleidPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacybeleid Alomnify</h1>
            <p className="text-sm text-gray-600 italic">Laatst bijgewerkt: 25 september 2025</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Inleiding</h2>
              <div className="text-gray-700 leading-relaxed">
                Alomnify respecteert uw privacy en is toegewijd aan het beschermen van uw persoonlijke gegevens. 
                Dit privacybeleid legt uit hoe wij omgaan met uw gegevens bij gebruik van onze website.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Welke gegevens verzamelen we?</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Persoonlijke gegevens</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                • Email adres (voor orderbevestigingen)<br/>
                • Betalingsgegevens (verwerkt door Stripe)
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 Technische gegevens</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                • Browser informatie (automatisch verzameld voor website functionaliteit)<br/>
                • IP adres (niet verzameld door deze website, maar servers van Stripe en hosting loggen dit automatisch)<br/>
                • Cookies (zie sectie 7)<br/>
                • Plantencollectie data (tijdelijke opslag in browser voor winkelmandje functionaliteit)
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">2.3 Collectiegegevens</h3>
              <div className="text-gray-700 leading-relaxed">
                • Plantencollectie samenstelling (anoniem opgeslagen in beveiligde database)<br/>
                • Unieke collectie ID (geen koppeling aan persoonlijke gegevens)
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Hoe gebruiken we uw gegevens?</h2>
              <div className="text-gray-700 leading-relaxed">
                Wij gebruiken uw gegevens om:<br/><br/>
                • Uw plantencollectie anoniem op te slaan<br/>
                • Orderbevestigingen te versturen<br/>
                • De website functionaliteit te bieden<br/>
                • Klantenservice te bieden (nadat u ons heeft gecontacteerd)<br/>
                • Wettelijke verplichtingen na te komen
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Delen van gegevens</h2>
              <div className="text-gray-700 leading-relaxed mb-4">
                Wij delen uw gegevens met:
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Derde partijen</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                • Stripe (betalingsverwerking) - PCI DSS gecertificeerd<br/>
                • Cloudflare (database hosting - geen persoonlijke gegevens, alleen anonieme collectierecords)<br/>
                • Email service providers (voor versturen orderbevestigingen en reageren op aangevraagde support)<br/>
                • Vercel (website hosting)
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Wettelijke vereisten</h3>
              <div className="text-gray-700 leading-relaxed">
                Wij kunnen uw gegevens delen wanneer wettelijk verplicht of ter bescherming 
                van onze rechten, eigendom of veiligheid.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Gegevensbeveiliging</h2>
              <div className="text-gray-700 leading-relaxed">
                Wij implementeren passende technische en organisatorische maatregelen:<br/><br/>
                • HTTPS versleuteling voor alle communicatie<br/>
                • Geen opslag van volledige betalingsgegevens<br/>
                • Regelmatige beveiligingsupdates<br/>
                • Toegangscontroles en monitoring<br/>
                • Anonieme gegevensopslag zonder persoonlijke identificatie
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Uw rechten (GDPR)</h2>
              <div className="text-gray-700 leading-relaxed">
                Als EU burger heeft u het recht om:<br/><br/>
                • Uw gegevens in te zien (recht op toegang)<br/>
                • Correcties aan te vragen (recht op rectificatie)<br/>
                • Verwijdering te vragen (recht om vergeten te worden)<br/>
                • Overdracht te vragen (recht op portabiliteit)<br/>
                • Bezwaar te maken tegen verwerking<br/>
                • Toestemming in te trekken
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Cookies en tracking</h2>
              <div className="text-gray-700 leading-relaxed">
                Onze website gebruikt:<br/><br/>
                • Lokale opslag (localStorage) voor website instellingen en winkelmandje<br/>
                • Functionele cookies voor website functionaliteit<br/>
                • Geen tracking cookies van derden<br/>
                • Geen advertentie tracking<br/>
                • Stripe cookies (alleen tijdens betaling)
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Bewaarperiode</h2>
              <div className="text-gray-700 leading-relaxed">
                • Ordergegevens: 10 jaar (fiscale verplichting)<br/>
                • Email adressen: Tot u vraagt om verwijdering<br/>
                • Website data: Tot u uw browser cache leegt<br/>
                • Collectierecords: Permanent (anoniem, geen persoonlijke gegevens)
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Internationale overdrachten</h2>
              <div className="text-gray-700 leading-relaxed">
                Uw gegevens kunnen worden verwerkt buiten de EU door:<br/><br/>
                • Stripe (VS - Privacy Shield gecertificeerd)<br/>
                • Cloudflare (VS - GDPR compliant)<br/>
                • Vercel (VS - GDPR compliant)<br/><br/>
                Alle overdrachten voldoen aan GDPR vereisten.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Contact</h2>
              <div className="text-gray-700 leading-relaxed">
                Voor vragen over dit privacybeleid of uw gegevens:<br/><br/>
                <strong>Alomnify CV</strong><br/>
                Gluvinksweg 6<br/>
                7751 SM Dalen<br/>
                KvK: 98348124<br/>
                Email: info@alomnify.nl<br/>
                Reactietijd: Binnen 30 dagen<br/>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Wijzigingen</h2>
              <div className="text-gray-700 leading-relaxed">
                Wij kunnen dit privacybeleid bijwerken. Bij belangrijke wijzigingen 
                informeren wij u via email of een melding op de website.
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Dit beleid is opgesteld conform de AVG/GDPR wetgeving
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}