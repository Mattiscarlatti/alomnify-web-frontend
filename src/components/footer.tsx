import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="flex justify-end mb-8">
          {/* Legal links */}
          <div className="text-right">
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
              <span>BTW: NL868458077B01</span>
              <span>Gluvinksweg 6</span>
              <span>7751 SM Dalen</span>
              <span>Nederland</span>
            </div>
          </div>
          
          {/* Legal compliance notice */}
          <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
            <p>
              Deze website voldoet aan de Nederlandse wetgeving betreffende online dienstverlening.
              Voor vragen over privacy en gegevensverwerking, zie ons privacybeleid.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}