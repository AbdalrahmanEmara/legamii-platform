import { LogoIcon } from "../icons/LogoIcon";

export default function Logo({
  className = "",
  LEstyles = "",
  GAstyles = "",
  logoSize = 48,
  logoClassName = "",
}) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      <LogoIcon size={logoSize} className={logoClassName} />
      <div className="flex items-end">
        <p className="text-text">
          <span className={`font-cabin-sketch ${LEstyles}`}>LE</span>
          <span className={`font-primary ${GAstyles}`}>GAMII</span>
        </p>
      </div>
    </div>
  );
}
