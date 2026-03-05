// components/BackgroundFrom0.js
export default function BackgroundFrom0({ children }) {
  return (
    <div className="bg-primary-500 relative min-h-screen w-full overflow-hidden">
      {/* Layer 1 — Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Layer 2 — Doodles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left doodles */}
        <svg
          className="absolute top-8 left-8 h-16 w-16 text-neutral-800 opacity-60"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="32" cy="32" r="12" />
          <path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32" />
          <circle cx="32" cy="32" r="20" strokeDasharray="4 4" />
        </svg>

        {/* Rocket */}
        <svg
          className="absolute top-20 right-24 h-20 w-20 rotate-45 text-neutral-800 opacity-60"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M32 8 C20 20 16 36 20 48 L32 40 L44 48 C48 36 44 20 32 8Z" />
          <circle cx="32" cy="28" r="4" />
          <path d="M20 48 L16 56 L24 52 M44 48 L48 56 L40 52" />
        </svg>

        {/* Math symbols - top center */}
        <span className="font-cabin-sketch absolute top-12 left-1/3 text-3xl text-neutral-800 opacity-50">
          1001
        </span>
        <span className="font-cabin-sketch absolute top-32 left-1/4 text-2xl text-neutral-800 opacity-50">
          +
        </span>
        <span className="font-cabin-sketch absolute top-16 right-1/3 text-2xl text-neutral-800 opacity-50">
          ×
        </span>

        {/* Planet with ring */}
        <svg
          className="absolute top-8 right-1/4 h-24 w-24 text-neutral-800 opacity-60"
          viewBox="0 0 80 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="40" cy="40" r="16" />
          <ellipse cx="40" cy="40" rx="30" ry="8" transform="rotate(-20 40 40)" />
        </svg>

        {/* WWW text */}
        <span className="font-cabin-sketch absolute top-1/3 right-12 text-2xl text-neutral-800 opacity-50">
          WWW
        </span>

        {/* Lightbulb */}
        <svg
          className="absolute bottom-1/3 left-12 h-16 w-16 text-neutral-800 opacity-60"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M32 8 C20 8 12 18 12 28 C12 36 18 42 24 46 L24 52 L40 52 L40 46 C46 42 52 36 52 28 C52 18 44 8 32 8Z" />
          <path d="M24 56 L40 56 M26 60 L38 60" />
          <path d="M32 2 L32 6 M12 12 L16 16 M52 12 L48 16" />
        </svg>

        {/* Arrow */}
        <svg
          className="absolute right-16 bottom-1/4 h-12 w-12 rotate-12 text-neutral-800 opacity-60"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 40 L40 8 M40 8 L40 24 M40 8 L24 8" />
        </svg>

        {/* Stars scattered */}
        <svg
          className="absolute top-1/4 left-16 h-8 w-8 text-neutral-800 opacity-50"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 0 L18 12 L32 12 L20 20 L24 32 L16 24 L8 32 L12 20 L0 12 L14 12 Z" />
        </svg>
        <svg
          className="absolute right-1/4 bottom-1/3 h-6 w-6 text-neutral-800 opacity-50"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 0 L18 12 L32 12 L20 20 L24 32 L16 24 L8 32 L12 20 L0 12 L14 12 Z" />
        </svg>

        {/* GO! text */}
        <span className="font-cabin-sketch absolute top-24 right-48 text-3xl text-neutral-800 opacity-50">
          GO!
        </span>

        {/* Squiggly line */}
        <svg
          className="absolute bottom-48 left-1/3 h-8 w-32 text-neutral-800 opacity-50"
          viewBox="0 0 128 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M0 16 Q16 0 32 16 T64 16 T96 16 T128 16" />
        </svg>
      </div>

      {/* Layer 3 — Jagged Purple Terrain */}
      <div className="absolute right-0 bottom-0 left-0 z-10">
        <svg
          viewBox="0 0 1440 150"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-32 w-full md:h-48 lg:h-56"
        >
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
            className="fill-primary-700"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen">{children}</div>
    </div>
  );
}
