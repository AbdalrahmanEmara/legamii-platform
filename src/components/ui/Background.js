import Image from "next/image";

export default function Background({ children = "", className = "" }) {
  return (
    <div className="absolute inset-0">
      <div className="relative bg-primary-500 overflow-hidden">
        <Image
          src="/images/Background.png"
          alt="Background"
          fill
          className="min-w-377.5 max-h-227.5"
        />
        <div className={`relative min-h-screen ${className || ""}`}>{children}</div>
      </div>
    </div>
  );
}