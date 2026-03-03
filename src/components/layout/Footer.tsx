// import Logo from "../auth/Logo";

import Link from "next/link";
import Logo from "../auth/Logo";
import { Github, Linkedin, Twitter } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-card">

//       {/* Main footer content */}
//       <div className="px-[188px] py-10">
//         <div className="flex gap-8">
//           {/* Column 1 - Brand */}
//           <div className="flex-1">
//             {/* Logo placeholder - replace with actual logo */}
//             <div className="mb-4 flex items-center gap-2">
//               {/* <div className="bg-muted h-10 w-10 rounded" />
//               <span className="text-foreground text-xl font-bold tracking-wider">LEGAMII</span> */}
//               <Logo />
//             </div>
//             <p className="text-muted-foreground text-sm">
//               Next-gen gamified learning platform powered by advanced tech.
//             </p>
//           </div>

//           {/* Column 2 - Navigation */}
//           <div className="flex-1">
//             <div className="text-Primary-500 justify-start font-['Dogica_Pixel'] text-sm leading-5 font-bold">
//               Navigation
//             </div>
{
  /* <ul className="space-y-2">
  <li>
    <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
      Home
    </a>
  </li>
  <li>
    <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
      Practice
    </a>
  </li>
  <li>
    <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
      Contests
    </a>
  </li>
  <li>
    <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
      Profile
    </a>
  </li>
</ul>; */
}
//           </div>

//           {/* Column 3 - System */}
{
  /* <div className="flex-1">
  <div className="text-Primary-500 justify-start font-['Dogica_Pixel'] text-sm leading-5 font-bold">
    System
  </div>
  <ul className="space-y-2">
    <li className="flex items-center gap-2">
      <span className="text-muted-foreground">•</span>
      <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
        Help & Support
      </a>
    </li>
    <li className="flex items-center gap-2">
      <span className="text-muted-foreground">•</span>
      <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
        About
      </a>
    </li>
    <li className="flex items-center gap-2">
      <span className="text-muted-foreground">•</span>
      <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
        Privacy Policy
      </a>
    </li>
    <li className="flex items-center gap-2">
      <span className="text-muted-foreground">•</span>
      <a href="#" className="text-foreground hover:text-primary text-sm transition-colors">
        Terms
      </a>
    </li>
  </ul>
</div>; */
}

//           {/* Column 4 - Connect */}
//           <div className="flex-1">
//             <div className="text-Primary-500 justify-start font-['Dogica_Pixel'] text-sm leading-5 font-bold">
//               Connect
//             </div>
//             <div className="mb-3 flex items-center gap-3">
//               {/* Icon placeholders - replace src with actual icons */}
//               <a
//                 href="#"
//                 className="bg-muted hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
//               >
//                 <img src="/placeholder.svg" alt="Social 1" className="h-5 w-5" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-muted hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
//               >
//                 <img src="/placeholder.svg" alt="Social 2" className="h-5 w-5" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-muted hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
//               >
//                 <img src="/placeholder.svg" alt="Social 3" className="h-5 w-5" />
//               </a>
//             </div>
//             <p className="text-muted-foreground text-sm">Follow for system updates</p>
//           </div>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="border-border flex items-center justify-between border-t px-[188px] py-4">
//         <p className="text-muted-foreground text-sm">© 2026 LEGAMII. All systems operational.</p>
//         <p className="text-muted-foreground text-sm">Powered by the LEGAMII Team</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

export default function Footer() {
  return (
    <footer className="relative bg-el-bg">
      <div className="absolute w-5 h-5 bg-primary-500"></div>
      <div className="absolute right-0 w-10 h-5 bg-primary-500"></div>
      <div className="absolute right-0 top-5 w-5 h-5 bg-primary-500"></div>
      <div className="absolute bottom-0 w-10 h-5 bg-primary-500"></div>
      <div className="absolute bottom-10 w-5 h-5 bg-primary-500"></div>
      <div className="absolute bottom-5 left-10 w-10 h-5 bg-primary-500"></div>
      <div className="absolute bottom-0 w-10 h-5 bg-primary-500"></div>
      <div className="absolute bottom-0 right-0 w-10 h-5 bg-primary-500"></div>
      <div className="absolute bottom-5 right-10 w-15 h-5 bg-primary-500"></div>

      {/* main content */}
      <div className="px-26  ">
      <div className=" w-full bg-el-bg gap-md py-md flex z-10 border-b border-neutral-300">
        <div className="gap-sm flex flex-1 flex-col">
          <Logo
            logoSize={58}
            LEstyles={"text-text text-3xl font-bold tracking-[3.36px]"}
            GAstyles={"text-text text-xl font-normal leading-6"}
          />
          <p className="text-text font-secondary text-sm leading-5 font-normal max-w-[240px]">
            Next-gen gamified learning platform powered by advanced tech.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div className="gap-sm flex flex-1 flex-col">
          <p className="text-primary-500 font-primary text-sm leading-5 font-bold">Navigation</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-primary-500 font-rajdhani mr-xs2 text-base font-semibold">
                  ›
                </span>{" "}
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/practice"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-primary-500 font-rajdhani mr-xs2 text-base font-semibold">
                  ›
                </span>{" "}
                Practice
              </Link>
            </li>
            <li>
              <Link
                href="/contests"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-primary-500 font-rajdhani mr-xs2 text-base font-semibold">
                  ›
                </span>{" "}
                Contests
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-primary-500 font-rajdhani mr-xs2 text-base font-semibold">
                  ›
                </span>{" "}
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - System */}
        <div className="gap-sm flex flex-1 flex-col">
          <p className="text-primary-500 font-primary text-sm leading-5 font-bold">System</p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-secondary-500 font-rajdhani mr-xs2 text-base leading-5 font-semibold">
                  ›
                </span>{" "}
                Help & Support
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-secondary-500 font-rajdhani mr-xs2 text-base leading-5 font-semibold">
                  ›
                </span>{" "}
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-secondary-500 font-rajdhani mr-xs2 text-base leading-5 font-semibold">
                  ›
                </span>{" "}
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
              >
                <span className="text-secondary-500 font-rajdhani mr-xs2 text-base leading-5 font-semibold">
                  ›
                </span>{" "}
                Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Connect */}
        <div className="gap-sm flex flex-1 flex-col">
          <p className="text-primary-500 font-primary text-sm leading-5 font-bold">Connect</p>
          <div className="flex gap-[12px]">
            <a
              href="#"
              className="border-primary-500 flex h-10 w-10 items-center justify-center border-[1.6px]"
            >
              <Github className="text-primary-500" />
            </a>
            <a
              href="#"
              className="border-[#0D00FF] flex h-10 w-10 items-center justify-center border-[1.6px]"
            >
              <Linkedin className="text-[#0D00FF]" />
            </a>
            <a
              href="#"
              className="border-[#00FFFF] flex h-10 w-10 items-center justify-center border-[1.6px]"
            >
              <Twitter className="text-[#00FFFF]" />
            </a>
          </div>
          <p className="text-sec-text text-sm font-normal font-secondary leading-5">Follow for system updates</p>
        </div>
      </div>

      <div className="flex justify-between pt-lg pb-xl">
        <p className="text-sec-text text-xs font-normal font-share-tech-mono leading-4">© 2026 LEGAMII. All systems operational.</p>
        <p className="text-sec-text text-xs font-normal font-primary leading-4">Powered by the LEGAMII Team</p>
      </div>
      </div>

    </footer>
  );
}
