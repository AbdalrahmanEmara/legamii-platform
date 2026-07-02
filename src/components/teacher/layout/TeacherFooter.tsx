import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import Logo from "@/components/auth/Logo";

const footerLinks = [
  { href: "/teacher/dashboard", label: "Dashboard" },
  { href: "/teacher/classes", label: "Classes" },
  { href: "/teacher/contests", label: "Contests" },
  { href: "/teacher/analytics", label: "Analytics" },
  { href: "/teacher/question-bank", label: "Q.Bank" },
];

const socialLinks = [
  { label: "GitHub", icon: Github },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Twitter", icon: Twitter },
];

export default function TeacherFooter() {
  return (
    <footer className="bg-el-bg border-t border-neutral-300">
      <div className="gap-lg px-base py-xl2 md:px-md 2xl:px-xl3 mx-auto grid max-w-[1440px] md:grid-cols-[1.1fr_1fr_auto]">
        <div className="space-y-sm">
          <Logo
            className="gap-xs2 items-center"
            logoSize={42}
            LEstyles="text-text text-lg tracking-[2px]"
            GAstyles="text-text text-sm tracking-[1px]"
          />
          <p className="font-secondary max-w-[260px] text-sm leading-5 text-neutral-700">
            Next-gen gamified learning platform powered by advanced tech.
          </p>
        </div>

        <div className="space-y-sm">
          <p className="font-primary text-caption-2 text-primary-500 uppercase">Navigation</p>
          <ul className="gap-xs grid">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-secondary text-text hover:text-primary-500 text-sm font-medium transition-colors"
                >
                  <span className="text-primary-500 mr-2">›</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-sm">
          <p className="font-primary text-caption-2 text-primary-500 uppercase">Connect</p>
          <div className="gap-xs2 flex items-center">
            {socialLinks.map(({ label, icon: Icon }) => (
              <div
                key={label}
                aria-label={`${label} placeholder`}
                title={`${label} placeholder`}
                className="border-primary-300 text-primary-500 flex h-10 w-10 items-center justify-center rounded-lg border bg-white shadow-[2px_3px_0_0_rgba(0,0,0,0.18)]"
              >
                <Icon className="h-4 w-4" />
              </div>
            ))}
          </div>
          <p className="font-secondary text-sm text-neutral-700">Follow for system updates</p>
        </div>
      </div>
    </footer>
  );
}
