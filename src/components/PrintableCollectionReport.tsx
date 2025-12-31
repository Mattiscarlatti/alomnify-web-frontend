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
        {/* Header */}
        <div className="mb-8 border-b-2 border-orange-600 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plantencollectie Rapport</h1>
          <p className="text-gray-600">Collectie ID: {collectionId}</p>
          <p className="text-gray-600">Gegenereerd op: {generatedDate}</p>
        </div>

        {/* Statistics Grid - Static version (no Swiper) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Statistieken</h2>
          <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">Biodiversiteitsscore</div>
              <div className="text-2xl font-bold text-orange-600">{statistics.totalScore}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Plantensoorten</div>
              <div className="text-2xl font-bold">{statistics.aantal}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Inheemse soorten</div>
              <div className="text-2xl font-bold">{statistics.aantalInh}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Boomsoorten</div>
              <div className="text-2xl font-bold">{statistics.aantalBomen}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Boomsoorten (25+ jaar)</div>
              <div className="text-2xl font-bold">{statistics.aantalBomen25}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Groenblijvende soorten</div>
              <div className="text-2xl font-bold">{statistics.aantalGroen}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Eetbare soorten</div>
              <div className="text-2xl font-bold">{statistics.aantalEetbaar}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Bedreigde soorten</div>
              <div className="text-2xl font-bold">{statistics.aantalBedreigd2 + statistics.aantalErnstigB}</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Visualisaties</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="chart-container">
              <h3 className="text-center mb-2 font-semibold">Bloeiende Planten</h3>
              <ChartBloei plantendata4={chartData.aantalBloei} />
            </div>
            <div className="chart-container">
              <h3 className="text-center mb-2 font-semibold">Kwetsbaarheid van Inheemsen</h3>
              <ChartBedreigd plantendata3={chartData.aantalBedreigd} />
            </div>
            <div className="chart-container">
              <h3 className="text-center mb-2 font-semibold">Eetbare Planten</h3>
              <ChartEetb plantendata5={chartData.aantalEet} />
            </div>
            <div className="chart-container">
              <h3 className="text-center mb-2 font-semibold">Type Planten</h3>
              <ChartPlantTypen plantendata1={chartData.aantalType} />
            </div>
          </div>
        </div>

        {/* Plant Table - New page */}
        <div style={{ pageBreakBefore: 'always' }}>
          <h2 className="text-2xl font-bold mb-4">Complete Plantenlijst</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2">Nr</th>
                <th className="border border-gray-300 px-2 py-2">Latijnse naam</th>
                <th className="border border-gray-300 px-2 py-2">Nederlandse naam</th>
                <th className="border border-gray-300 px-2 py-2">Type</th>
                <th className="border border-gray-300 px-2 py-2">Bedreigd</th>
                <th className="border border-gray-300 px-2 py-2">Inheems</th>
                <th className="border border-gray-300 px-2 py-2">Eetbaar</th>
                <th className="border border-gray-300 px-2 py-2">Bloeimaanden</th>
                <th className="border border-gray-300 px-2 py-2">Groenblijvend</th>
              </tr>
            </thead>
            <tbody>
              {floras.map((plant) => (
                <tr key={plant.id}>
                  <td className="border border-gray-300 px-2 py-1">{plant.id}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.latin_name}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.dutch_name}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.plant_type}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.be_dreigd}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.in_heems}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.eet_baar}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.bloei_tijd}</td>
                  <td className="border border-gray-300 px-2 py-1">{plant.groen_blijvend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-sm text-gray-600 text-center">
          <p>Gegenereerd door Alomnify Plantencollectie Systeem</p>
          <p>© {new Date().getFullYear()} - Biodiversiteitsrapportage</p>
        </div>
      </div>
    );
  }
);

PrintableCollectionReport.displayName = 'PrintableCollectionReport';

export default PrintableCollectionReport;
