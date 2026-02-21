// components/AuthBackground.tsx
export default function Background({ children }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Layer 1 — Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 2 — Jagged Purple Terrain */}
      <div className="absolute right-0 bottom-0 left-0 mt-[-2px] flex flex-col">
        <svg
          viewBox="0 0 1440 150"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-32 w-full md:h-48 lg:h-56"
        >
          {/* Main jagged shape matched to your image */}
          <path
            d="
              M0 15 
              L20 15 L35 25 L55 30 L65 45 L80 45 L95 70 L125 70 
              L150 50 L185 45 L220 35 L245 25 L285 20 L310 30 
              L335 50 L365 50 L385 30 L415 25 L445 10 L485 15 L530 15 L565 12 
              L595 25 L625 32 L665 20 L695 20 L725 35 L755 35 
              L775 50 L825 60 L865 60 L885 40 L925 35 L945 55 L975 70 L1015 75 
              L1045 65 L1075 60 L1095 40 L1125 30 L1165 15 L1195 25 L1225 45 
              L1255 40 L1295 45 L1325 45 L1355 25 L1385 15 L1425 10 L1440 15 
              L1440 150 L0 150 Z"
            fill="#D865E0"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
