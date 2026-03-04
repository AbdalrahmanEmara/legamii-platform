import Image from "next/image";

export default function BackgroundAuth({ children = "", className = "" }) {
  return (
    <div className="absolute inset-0">
      <div className="relative min-h-screen bg-[url('/images/Texturelabs_Paper.png')] bg-cover bg-center overflow-hidden">
        <Image
          src="/images/Drops&downs.png"
          alt="Vector"
          width={2000}
          height={500}
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-60 min-w-full"
          style={{ width: "1900px", maxWidth: "none" }}
        />
        <div className={`relative min-h-screen ${className || ""}`}>{children}</div>
      </div>
    </div>
  );
}