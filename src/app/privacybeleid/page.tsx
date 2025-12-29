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
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introductie</h2>
              <div className="text-gray-700 leading-relaxed">
                Alomnify respecteert je privacy en beschermt je persoonlijke gegevens.
                Dit privacybeleid legt uit welke gegevens we verzamelen en hoe we deze gebruiken.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Welke gegevens verzamelen we?</h2>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Persoonlijke gegevens</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                • Email adres (verplicht voor bevestigingen van opgeslagen collecties)
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 Technische gegevens</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                • Browser informatie (automatisch verzameld voor website functionaliteit)<br/>
                • IP adres (niet door ons verzameld, maar hosting servers loggen dit automatisch)<br/>
                • Cookies (zie sectie 7)<br/>
                • Plantencollectie data (tijdelijke opslag in je browser)
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">2.3 Collectiegegevens</h3>
              <div className="text-gray-700 leading-relaxed">
                • Plantencollectie samenstelling (anoniem opgeslagen in beveiligde database)<br/>
                • Unieke collectie ID (geen koppeling aan persoonlijke gegevens)<br/>
                • Omgevingsfactoren (stromend water, kalkrijkdom, rommelige hoekjes)
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Waarom verzamelen we dit?</h2>
              <div className="text-gray-700 leading-relaxed">
                We gebruiken je gegevens om:<br/><br/>
                • Je plantencollectie anoniem op te slaan<br/>
                • Bevestigingsmails te versturen<br/>
                • De website goed te laten werken<br/>
                • Klantenservice te bieden (als je contact met ons opneemt)<br/>
                • Aan wettelijke verplichtingen te voldoen
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Met wie delen we gegevens?</h2>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Derde partijen</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                We delen alleen gegevens met partijen die we nodig hebben om de service te draaien:<br/><br/>
                • <strong>Cloudflare</strong> (database hosting - alleen anonieme collectierecords, geen persoonlijke gegevens)<br/>
                • <strong>Vercel</strong> (website hosting)<br/>
                • <strong>Email provider</strong> (voor versturen bevestigingsmails)<br/><br/>
                Alle partijen zijn GDPR compliant en verwerken data in GDPR-veilige datacenters.
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Wettelijke vereisten</h3>
              <div className="text-gray-700 leading-relaxed">
                We kunnen je gegevens delen wanneer we wettelijk verplicht zijn of ter bescherming
                van onze rechten, eigendom of veiligheid.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Beveiliging</h2>
              <div className="text-gray-700 leading-relaxed">
                We implementeren passende beveiligingsmaatregelen:<br/><br/>
                • HTTPS versleuteling voor alle communicatie<br/>
                • Regelmatige beveiligingsupdates<br/>
                • Toegangscontroles en monitoring<br/>
                • Anonieme gegevensopslag (collecties zijn niet gekoppeld aan personen)
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Jouw rechten (GDPR)</h2>
              <div className="text-gray-700 leading-relaxed">
                Als EU burger heb je recht op:<br/><br/>
                • <strong>Inzage</strong> - Je gegevens bekijken<br/>
                • <strong>Correctie</strong> - Onjuiste gegevens laten aanpassen<br/>
                • <strong>Verwijdering</strong> - Je gegevens laten verwijderen (recht om vergeten te worden)<br/>
                • <strong>Overdracht</strong> - Je gegevens in een bruikbaar formaat ontvangen<br/>
                • <strong>Bezwaar</strong> - Bezwaar maken tegen verwerking<br/>
                • <strong>Intrekking</strong> - Toestemming intrekken<br/><br/>

                <strong>Gebruik maken van je rechten?</strong><br/>
                Mail naar info@alomnify.nl - we reageren binnen 30 dagen.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Cookies en lokale opslag</h2>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">7.1 Wat we WEL gebruiken</h3>
              <div className="text-gray-700 leading-relaxed mb-4">
                <strong>Lokale opslag (localStorage)</strong><br/>
                • Website instellingen en voorkeuren<br/>
                • Tijdelijke plantencollectie data<br/><br/>

                <strong>Essentiële cookies</strong><br/>
                • Next.js session cookies (nodig voor website functionaliteit)<br/>
                • Geen permanente tracking cookies
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">7.2 Wat we NIET gebruiken</h3>
              <div className="text-gray-700 leading-relaxed">
                • Google Analytics of andere tracking tools<br/>
                • Advertentie cookies<br/>
                • Social media tracking pixels<br/>
                • Cross-site tracking cookies<br/><br/>

                We tracken je niet en verkopen je gegevens niet aan derden.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Hoe lang bewaren we gegevens?</h2>
              <div className="text-gray-700 leading-relaxed">
                • <strong>Email adressen:</strong> Tot je om verwijdering vraagt<br/>
                • <strong>Browser data:</strong> Tot je je browser cache leegt<br/>
                • <strong>Collectierecords:</strong> Kunnen permanent bewaard worden (continuïteit service),
                  maar je kunt altijd om verwijdering vragen via je GDPR rechten
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Wijzigingen</h2>
              <div className="text-gray-700 leading-relaxed">
                We kunnen dit privacybeleid aanpassen. Bij belangrijke wijzigingen informeren we je
                via email of een melding op de website.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Contact</h2>
              <div className="text-gray-700 leading-relaxed">
                Vragen over dit privacybeleid of je gegevens?<br/><br/>
                <strong>Alomnify CV</strong><br/>
                Gluvinksweg 6<br/>
                7751 SM Dalen<br/>
                KvK: 98348124<br/>
                BTW: NL868458077B01<br/>
                Email: info@alomnify.nl<br/>
                Reactietijd: Binnen 30 dagen (GDPR verzoeken)
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Dit beleid voldoet aan de AVG/GDPR wetgeving
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
