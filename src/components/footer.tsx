import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl">🌱</span>
              <h3 className="text-xl font-bold ml-2">Alomnify</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Nederlandse flora collecties voor natuurliefhebbers. Ontdek, verzamel en bewaar uw eigen unieke plantenverzameling.
            </p>
            <div className="text-sm text-gray-400">
              <p><strong>Alomnify CV</strong></p>
              <p>Gluvinksweg 6</p>
              <p>7751 SM Dalen</p>
              <p>KvK: 98348124</p>
              <p>Email: info@alomnify.nl</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Website</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Zoeken</Link></li>
              <li><Link href="/plantcollection" className="hover:text-white transition-colors">Plantencollectie</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Over Alomnify</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold mb-4">Juridisch</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link></li>
              <li><Link href="/privacybeleid" className="hover:text-white transition-colors">Privacybeleid</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with legal requirements */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Alomnify CV. Alle rechten voorbehouden.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs text-gray-500">
              <span>KvK: 98348124</span>
              <span>7751 SM Dalen</span>
              <span>Nederland</span>
            </div>
          </div>
          
          {/* Legal compliance notice */}
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
            <p>
              Deze website voldoet aan de Nederlandse wetgeving betreffende online dienstverlening. 
              Alle transacties worden veilig verwerkt via Stripe. 
              Voor vragen over privacy en gegevensverwerking, zie ons{' '}
              <Link href="/privacybeleid" className="text-gray-400 hover:text-white underline">privacybeleid</Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}