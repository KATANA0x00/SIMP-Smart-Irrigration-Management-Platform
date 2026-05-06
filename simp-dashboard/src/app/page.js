export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">SIMP - Dashboard (Public)</h1>
      <p className="mt-4 opacity-70">
        Smart Irrigation Management Platform - Overview
      </p>

      <div className="mt-8 space-x-4">
        <a
          href="/control"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Control
        </a>
        <a
          href="/config"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Go to Config
        </a>
      </div>
      <div className="flex flex-col">
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
    </div>
  );
}
