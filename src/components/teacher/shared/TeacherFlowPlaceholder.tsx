import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReusableWindow from "@/components/ui/ReusableWindow";

interface PlaceholderAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

interface TeacherFlowPlaceholderProps {
  windowTitle: string;
  title: string;
  description: string;
  highlights?: string[];
  actions?: PlaceholderAction[];
}

export default function TeacherFlowPlaceholder({
  windowTitle,
  title,
  description,
  highlights = [],
  actions = [],
}: TeacherFlowPlaceholderProps) {
  return (
    <div className="mx-auto max-w-[1240px]">
      <ReusableWindow title={windowTitle} className="overflow-hidden">
        <div className="space-y-lg p-base md:p-md">
          <div className="flex flex-col gap-base lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-sm">
              <p className="font-primary text-caption-2 uppercase text-primary-500">Teacher flow</p>
              <h1 className="font-primary text-h6 leading-tight uppercase text-text md:text-h5">
                {title}
              </h1>
              <p className="font-secondary text-body-3 leading-6 text-neutral-700">{description}</p>
            </div>

            <div className="rounded-xl border border-primary-200 bg-primary-50 px-base py-sm shadow-[2px_3px_0_0_rgba(0,0,0,0.12)]">
              <p className="font-primary text-caption-2 uppercase text-primary-600">Status</p>
              <p className="mt-xxs font-secondary text-sm font-semibold text-text">
                Structure ready for the next teacher feature.
              </p>
            </div>
          </div>

          {highlights.length > 0 ? (
            <div className="grid gap-sm md:grid-cols-2 xl:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-sm py-sm shadow-[2px_3px_0_0_rgba(0,0,0,0.08)]"
                >
                  <p className="font-secondary text-sm font-medium text-text">{highlight}</p>
                </div>
              ))}
            </div>
          ) : null}

          {actions.length > 0 ? (
            <div className="flex flex-wrap gap-sm">
              {actions.map((action) => {
                const isPrimary = action.variant !== "secondary";

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`inline-flex items-center gap-xs rounded-lg border px-base py-sm font-primary text-caption-2 uppercase shadow-[2px_3px_0_0_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 ${
                      isPrimary
                        ? "border-text bg-primary-500 text-neutral-950"
                        : "border-neutral-300 bg-white text-text"
                    }`}
                  >
                    {action.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </ReusableWindow>
    </div>
  );
}
