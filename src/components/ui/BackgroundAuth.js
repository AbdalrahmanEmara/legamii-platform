export default function BackgroundAuth({ children = "", className = "" }) {
  return (
    <div className="absolute inset-0">
      <div className="relative min-h-screen overflow-hidden bg-[url('/images/BackgroundAuth.png')] bg-cover bg-center">
        <div className={`relative min-h-screen ${className || ""}`}>{children}</div>
      </div>
    </div>
  );
}
