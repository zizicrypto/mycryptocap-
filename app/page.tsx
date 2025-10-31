app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { CryptoList } from '@/components/CryptoList'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import type { CryptoData } from '@/types/crypto'
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";

export default function Page() {
    const { addMiniApp } = useAddMiniApp();
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          if (document.readyState !== 'complete') {
            await new Promise(resolve => {
              if (document.readyState === 'complete') {
                resolve(void 0);
              } else {
                window.addEventListener('load', () => resolve(void 0), { once: true });
              }

            });
          }

          await sdk.actions.ready();
          console.log("Farcaster SDK initialized successfully - app fully loaded");
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error);
          setTimeout(async () => {
            try {
              await sdk.actions.ready();
              console.log('Farcaster SDK initialized on retry');
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError);
            }

          }, 1000);
        }

      };
      initializeFarcaster();
    }, []);
  const [cryptos, setCryptos] = useState<CryptoData[]>([])
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchCryptos()
    const interval = setInterval(fetchCryptos, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCryptos(cryptos)
    } else {
      const filtered = cryptos.filter((crypto: CryptoData) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCryptos(filtered)
    }
  }, [searchTerm, cryptos])

  const fetchCryptos = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          protocol: 'https',
          origin: 'api.coingecko.com',
          path: '/api/v3/coins/markets',
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch crypto data')
      }

      const data = await response.json()
      setCryptos(data)
      setFilteredCryptos(data)
      setError('')
    } catch (err) {
      setError('Unable to load cryptocurrency data. Please try again later.')
      console.error('Error fetching cryptos:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-black pt-16 sm:pt-20">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <CryptoList cryptos={filteredCryptos} />
        )}
      </div>
    </main>
  )
}

