import Image from "next/image";

export default function Background({ children = "", className = "" }) {
  return (
    <div className="absolute inset-0">
      <div className="bg-primary-500 relative overflow-hidden">
        <Image
          src="/images/Background.png"
          alt="Background"
          fill
          className="max-h-[910px] min-w-377.5"
        />
        <div className={`relative min-h-screen ${className || ""}`}>{children}</div>
      </div>
    </div>
  );
}
