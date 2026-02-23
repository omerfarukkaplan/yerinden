"use client";

export default function Filters({
  search,
  setSearch,
}: any) {
  return (
    <div className="mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="İlan ara..."
        className="w-full border p-3 rounded"
      />
    </div>
  );
}