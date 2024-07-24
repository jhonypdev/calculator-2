import React, { useContext } from "react";
import { ExchangeContext } from "../../context/ExchangeContext";

const History: React.FC = () => {
  const exchangeContext = useContext(ExchangeContext);
  if (!exchangeContext) throw new Error("ExchangeContext must be used within an ExchangeProvider");

  const { history } = exchangeContext;

  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Histórico</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                De
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Para
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montante
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history && history.length > 0 ? (
              history.map((calc, index) => (
                <tr key={index} className="text-sm text-gray-900 hover:bg-gray-100">
                  <td className="px-3 py-4 whitespace-nowrap">
                    {new Date(calc.date).toLocaleString()}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">{calc.fromCurrency}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{calc.toCurrency}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{calc.formattedAmount}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{calc.ask}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{calc.formattedTotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-sm text-gray-500 text-center">
                  Sem registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
