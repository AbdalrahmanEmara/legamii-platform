import Image from "next/image";

export default function BackgroundV2({ children }) {
  return (
    <div className="relative min-h-screen bg-[url('/images/Texturelabs_Paper.png')] bg-cover bg-center">
      <Image
        src="/images/Drops&downs.png"
        alt="Vector"
        width={2500}
        height={500}
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-60 w-full overflow-hidden"
      />
      <div className="relative min-h-screen">{children}</div>
    </div>
  );
}
