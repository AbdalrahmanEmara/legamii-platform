import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-card border-border border-t">
      {/* Main footer content */}
      <div className="px-[188px] py-10">
        <div className="flex gap-8">
          {/* Column 1 - Brand */}
          <div className="flex-1">
            {/* Logo placeholder - replace with actual logo */}
            <div className="mb-4 flex items-center gap-2">
              {/* <div className="bg-muted h-10 w-10 rounded" />
              <span className="text-foreground text-xl font-bold tracking-wider">LEGAMII</span> */}
              <Logo />
            </div>
            <p className="text-muted-foreground text-sm">
              Next-gen gamified learning platform powered by advanced tech.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div className="flex-1">
            <div className="text-Primary-500 justify-start font-['Dogica_Pixel'] text-sm leading-5 font-bold">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Practice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Contests
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - System */}
          <div className="flex-1">
            <div className="text-Primary-500 justify-start font-['Dogica_Pixel'] text-sm leading-5 font-bold">
              System
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Help & Support
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">•</span>
                <a
                  href="#"
                  className="text-foreground hover:text-primary text-sm transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div className="flex-1">
            <div className="text-Primary-500 justify-start font-['Dogica_Pixel'] text-sm leading-5 font-bold">
              Connect
            </div>
            <div className="mb-3 flex items-center gap-3">
              {/* Icon placeholders - replace src with actual icons */}
              <a
                href="#"
                className="bg-muted hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              >
                <img src="/placeholder.svg" alt="Social 1" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-muted hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              >
                <img src="/placeholder.svg" alt="Social 2" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-muted hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              >
                <img src="/placeholder.svg" alt="Social 3" className="h-5 w-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">Follow for system updates</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-border flex items-center justify-between border-t px-[188px] py-4">
        <p className="text-muted-foreground text-sm">© 2026 LEGAMII. All systems operational.</p>
        <p className="text-muted-foreground text-sm">Powered by the LEGAMII Team</p>
      </div>
    </footer>
  );
};

export default Footer;
