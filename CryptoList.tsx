CryptoList.tsx
import { CryptoCard } from '@/components/CryptoCard'
import type { CryptoData } from '@/types/crypto'

interface CryptoListProps {
  cryptos: CryptoData[]
}

export function CryptoList({ cryptos }: CryptoListProps) {
  if (cryptos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No cryptocurrencies found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cryptos.map((crypto: CryptoData) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
    </div>
  )
}
