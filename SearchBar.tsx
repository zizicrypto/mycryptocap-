SearchBar.tsx
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="max-w-md text-black placeholder:text-gray-500"
      />
    </div>
  )
}
