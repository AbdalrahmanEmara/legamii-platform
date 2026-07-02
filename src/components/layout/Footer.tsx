import Link from "next/link";
import Logo from "../auth/Logo";
import { Github, Linkedin, Twitter } from "lucide-react";
import { STUDENT_LINKS, TEACHER_LINKS } from "@/lib/navigationLinks";

export default function Footer({ variant = "student" }) {
  return (
    <footer className="bg-el-bg relative">
      <div className="bg-primary-500 absolute h-5 w-5"></div>
      <div className="bg-primary-500 absolute right-0 h-5 w-10"></div>
      <div className="bg-primary-500 absolute top-5 right-0 h-5 w-5"></div>
      <div className="bg-primary-500 absolute bottom-0 h-5 w-10"></div>
      <div className="bg-primary-500 absolute bottom-10 h-5 w-5"></div>
      <div className="bg-primary-500 absolute bottom-5 left-10 h-5 w-10"></div>
      <div className="bg-primary-500 absolute bottom-0 h-5 w-10"></div>
      <div className="bg-primary-500 absolute right-0 bottom-0 h-5 w-10"></div>
      <div className="bg-primary-500 absolute right-10 bottom-5 h-5 w-15"></div>

      {/* main content */}
      <div className="px-26">
        <div className="bg-el-bg gap-md py-md z-10 flex w-full flex-wrap border-b border-neutral-300">
          <div className="gap-sm flex flex-1 flex-col">
            <Logo
              logoSize={58}
              LEstyles={"text-text text-3xl font-bold tracking-[3.36px]"}
              GAstyles={"text-text text-xl font-normal leading-6"}
            />
            <p className="text-text font-secondary max-w-[240px] text-sm leading-5 font-normal">
              Next-gen gamified learning platform powered by advanced tech.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div className="gap-sm flex flex-1 flex-col">
            <p className="text-primary-500 font-primary text-sm leading-5 font-bold">Navigation</p>
            <ul className="space-y-2">
              {(variant === "teacher" ? TEACHER_LINKS : STUDENT_LINKS).map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-text font-secondary hover:text-primary-500 text-sm font-medium transition-colors"
                  >
                    <span className="text-primary-500 font-rajdhani mr-xs2 text-base font-semibold">
                      ›
                    </span>{" "}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - System */}
          <div className="gap-sm flex flex-1 flex-col">
            <p className="text-primary-500 font-primary text-sm leading-5 font-bold">System</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-text font-secondary hover:text-secondary-500 text-sm font-medium transition-colors"
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
                  className="text-text font-secondary hover:text-secondary-500 text-sm font-medium transition-colors"
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
                  className="text-text font-secondary hover:text-secondary-500 text-sm font-medium transition-colors"
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
                  className="text-text font-secondary hover:text-secondary-500 text-sm font-medium transition-colors"
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
                className="flex h-10 w-10 items-center justify-center border-[1.6px] border-[#0D00FF]"
              >
                <Linkedin className="text-[#0D00FF]" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center border-[1.6px] border-[#00FFFF]"
              >
                <Twitter className="text-[#00FFFF]" />
              </a>
            </div>
            <p className="text-sec-text font-secondary text-sm leading-5 font-normal">
              Follow for system updates
            </p>
          </div>
        </div>

        <div className="pt-lg pb-xl flex justify-between">
          <p className="text-sec-text font-share-tech-mono text-xs leading-4 font-normal">
            © 2026 LEGAMII. All systems operational.
          </p>
          <p className="text-sec-text font-primary text-xs leading-4 font-normal">
            Powered by the LEGAMII Team
          </p>
        </div>
      </div>
    </footer>
  );
}
