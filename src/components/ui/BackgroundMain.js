import Background from "./Background";

export default function BackgroundMain({ children, className = "" }) {
  return (
    <div className="bg-primary-500 relative h-auto">
      <Background className="pointer-events-none absolute inset-0 z-1" />
      <div className={`px-xl3 py-xl2 relative top-0 left-0 ${className || ""} z-10`}>
        {children}
      </div>
    </div>
  );
}
