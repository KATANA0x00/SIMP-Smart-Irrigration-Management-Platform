export default function ControlPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Control Panel (Level 1)</h1>
      <p className="mt-4">This page requires Level 1 or Level 2 access.</p>
      
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">Back to Home</a>
      </div>
    </div>
  );
}
