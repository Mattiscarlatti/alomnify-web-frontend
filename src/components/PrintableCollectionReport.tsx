import React from 'react';
import { Flora2 } from '../../type';
import { ChartBedreigd } from './chartbedreigd';
import { ChartEetb } from './charteetbaar';
import { ChartBloei } from './chartbloei';
import { ChartPlantTypen } from './chartplanttypen';

interface Statistics {
  totalScore: number;
  aantal: number;
  aantalBomen: number;
  aantalBomen25: number;
  aantalGroen: number;
  aantalEetbaar: number;
  aantalBedreigd2: number;
  aantalErnstigB: number;
  aantalKwetsbaar: number;
  aantalGevoelig: number;
  aantalInh: number;
}

interface PrintableCollectionReportProps {
  floras: Flora2[];
  statistics: Statistics;
  chartData: {
    aantalType: { name: string; value: number }[];
    aantalBloei: { name: string; value: number }[];
    aantalBedreigd: { name: string; value: number }[];
    aantalEet: { name: string; value: number }[];
  };
  collectionId: string;
}

const PrintableCollectionReport = React.forwardRef<HTMLDivElement, PrintableCollectionReportProps>(
  ({ floras, statistics, chartData, collectionId }, ref) => {
    const generatedDate = new Date().toLocaleDateString('nl-NL');

    return (
      <div ref={ref} className="p-8 bg-white">
        {/* Header with gradient */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-3">🌿 Plantencollectie Rapport</h1>
          <div className="flex justify-between items-center text-orange-50">
            <p className="text-sm">Collectie ID: <span className="font-mono font-semibold">{collectionId}</span></p>
            <p className="text-sm">Gegenereerd: {generatedDate}</p>
          </div>
        </div>

        {/* Statistics Grid - Static version (no Swiper) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            📊 Statistieken
          </h2>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500 shadow-sm">
              <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Biodiversiteit</div>
              <div className="text-3xl font-bold text-orange-600">{statistics.totalScore}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-500 shadow-sm">
              <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Plantensoorten</div>
              <div className="text-3xl font-bold text-green-600">{statistics.aantal}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border-l-4 border-emerald-500 shadow-sm">
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Inheems</div>
              <div className="text-3xl font-bold text-emerald-600">{statistics.aantalInh}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-l-4 border-amber-500 shadow-sm">
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Boomsoorten</div>
              <div className="text-3xl font-bold text-amber-600">{statistics.aantalBomen}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-500 shadow-sm">
              <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Bomen 25+</div>
              <div className="text-3xl font-bold text-blue-600">{statistics.aantalBomen25}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border-l-4 border-teal-500 shadow-sm">
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">Groenblijvend</div>
              <div className="text-3xl font-bold text-teal-600">{statistics.aantalGroen}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-l-4 border-lime-500 shadow-sm">
              <div className="text-xs font-semibold text-lime-700 uppercase tracking-wide mb-1">Eetbaar</div>
              <div className="text-3xl font-bold text-lime-600">{statistics.aantalEetbaar}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-l-4 border-red-500 shadow-sm">
              <div className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Bedreigd</div>
              <div className="text-3xl font-bold text-red-600">{statistics.aantalBedreigd2 + statistics.aantalErnstigB}</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            📈 Visualisaties
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="chart-container bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className="text-center mb-3 font-bold text-gray-700 text-sm uppercase tracking-wide">Bloeiende Planten</h3>
              <ChartBloei plantendata4={chartData.aantalBloei} />
            </div>
            <div className="chart-container bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className="text-center mb-3 font-bold text-gray-700 text-sm uppercase tracking-wide">Kwetsbaarheid van Inheemsen</h3>
              <ChartBedreigd plantendata3={chartData.aantalBedreigd} />
            </div>
            <div className="chart-container bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className="text-center mb-3 font-bold text-gray-700 text-sm uppercase tracking-wide">Eetbare Planten</h3>
              <ChartEetb plantendata5={chartData.aantalEet} />
            </div>
            <div className="chart-container bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className="text-center mb-3 font-bold text-gray-700 text-sm uppercase tracking-wide">Type Planten</h3>
              <ChartPlantTypen plantendata1={chartData.aantalType} />
            </div>
          </div>
        </div>

        {/* Plant Table - New page */}
        <div style={{ pageBreakBefore: 'always' }}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            🌱 Complete Plantenlijst
          </h2>
          <div className="overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <th className="px-2 py-3 text-left font-bold">Nr</th>
                  <th className="px-2 py-3 text-left font-bold">Latijnse naam</th>
                  <th className="px-2 py-3 text-left font-bold">Nederlandse naam</th>
                  <th className="px-2 py-3 text-left font-bold">Type</th>
                  <th className="px-2 py-3 text-left font-bold">Bedreigd</th>
                  <th className="px-2 py-3 text-left font-bold">Inheems</th>
                  <th className="px-2 py-3 text-left font-bold">Eetbaar</th>
                  <th className="px-2 py-3 text-left font-bold">Bloei</th>
                  <th className="px-2 py-3 text-left font-bold">Groen</th>
                </tr>
              </thead>
              <tbody>
                {floras.map((plant, index) => (
                  <tr key={plant.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-2 py-2 border-b border-gray-200 font-semibold text-gray-700">{plant.id}</td>
                    <td className="px-2 py-2 border-b border-gray-200 italic text-gray-700">{plant.latin_name}</td>
                    <td className="px-2 py-2 border-b border-gray-200 font-medium text-gray-800">{plant.dutch_name}</td>
                    <td className="px-2 py-2 border-b border-gray-200 text-gray-600">{plant.plant_type}</td>
                    <td className="px-2 py-2 border-b border-gray-200 text-gray-600">{plant.be_dreigd}</td>
                    <td className="px-2 py-2 border-b border-gray-200 text-gray-600">{plant.in_heems}</td>
                    <td className="px-2 py-2 border-b border-gray-200 text-gray-600">{plant.eet_baar}</td>
                    <td className="px-2 py-2 border-b border-gray-200 text-gray-600">{plant.bloei_tijd}</td>
                    <td className="px-2 py-2 border-b border-gray-200 text-gray-600">{plant.groen_blijvend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-center">
            <p className="text-sm font-semibold text-gray-700">🌿 Gegenereerd door Alomnify Plantencollectie Systeem</p>
            <p className="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} - Biodiversiteitsrapportage voor een duurzame tuin</p>
          </div>
        </div>
      </div>
    );
  }
);

PrintableCollectionReport.displayName = 'PrintableCollectionReport';

export default PrintableCollectionReport;
