import BackgroundAuth from "./BackgroundAuth";

export default function BackgroundMain({ children, className = "" }) {
  return (
    <div className="relative h-auto bg-primary-500">
      <BackgroundAuth className="absolute inset-0 pointer-events-none z-1" >
        
      </BackgroundAuth>
      <div className={`px-xl3 relative top-0 left-0 ${className || ""} z-10`}>
        {children}
      </div>
    </div>
  );
}