export default function LogoWord({ className = "", LEstyles, GAstyles, logoClassName }) {
  return (
    <div className={`flex items-end ${className}`}>
      <p className="text-text">
        <span className={`font-cabin-sketch ${LEstyles}`}>LE</span>
        <span className={`font-primary ${GAstyles}`}>GAMII</span>
      </p>
    </div>
  );
}
