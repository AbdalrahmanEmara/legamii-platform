import Image from "next/image";

export default function BackgroundV2({ children }) {
  return (
    <div className="relative bg-[url('/images/Texturelabs_Paper.png')] bg-cover bg-center min-h-screen">
      <Image src="/images/Drops&downs.png" alt="Vector" width={2500} height={500} className="w-full overflow-hidden h-60 rounded-lg absolute bottom-0 left-0 right-0 pointer-events-none z-0" />
      <div className="relative min-h-screen">{children}</div>
    </div>
  )
}