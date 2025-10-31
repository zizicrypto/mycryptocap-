app/page.tsx

import Image from "next/image";

async function getCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1",
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export default async function Home() {
  const coins = await getCoins();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">MyCryptoCap</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Coin</th>
              <th className="p-3 text-right">Fiyat</th>
              <th className="p-3 text-right">24s %</th>
              <th className="p-3 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin: any, i: number) => (
              <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <Image src={coin.image} alt="" width={24} height={24} className="rounded-full" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-gray-400">{coin.symbol.toUpperCase()}</span>
                </td>
                <td className="p-3 text-right font-medium">${coin.current_price.toLocaleString()}</td>
                <td className={`p-3 text-right font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="p-3 text-right">${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
