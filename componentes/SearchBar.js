export default function SearchBar({ onSearch }) {
    return (
      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="border p-2 w-80"
          onKeyDown={(e) => e.key === 'Enter' && onSearch(e.target.value)}
        />
      </div>
    );
  }
  