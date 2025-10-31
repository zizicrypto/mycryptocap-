CryptoCard.tsx
import { Card, CardContent } from '@/components/ui/card'
import type { CryptoData } from '@/types/crypto'
import Image from 'next/image'

interface CryptoCardProps {
  crypto: CryptoData
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const priceChange = crypto.price_change_percentage_24h
  const isPositive = priceChange >= 0

  const formatPrice = (price: number): string => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
    return `$${price.toFixed(6)}`
  }

  const formatMarketCap = (cap: number): string => {
    if (cap >= 1e12) {
      return `$${(cap / 1e12).toFixed(2)}T`
    }
    if (cap >= 1e9) {
      return `$${(cap / 1e9).toFixed(2)}B`
    }
    if (cap >= 1e6) {
      return `$${(cap / 1e6).toFixed(2)}M`
    }
    return `$${cap.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 bg-white border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Image
              src={crypto.image}
              alt={crypto.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-black">{crypto.name}</h3>
              <p className="text-sm text-gray-600 uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            #{crypto.market_cap_rank}
          </span>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-2xl font-bold text-black">
              {formatPrice(crypto.current_price)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
            </span>
            <span className="text-xs text-gray-500">24h</span>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Market Cap</span>
              <span className="text-sm font-medium text-black">
                {formatMarketCap(crypto.market_cap)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-600">Volume 24h</span>
              <span className="text-sm font-medium text-black">
                {formatMarketCap(crypto.total_volume)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
