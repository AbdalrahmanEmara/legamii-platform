"use client";

import { useRouter } from "next/navigation";

const FILTERS = [
  {
    id: "ALL",
    label: "Contests",
    children: [
      {
        id: "ONGOING",
        label: "Live",
      },
      {
        id: "UPCOMING",
        label: "Upcoming",
      },
      {
        id: "REGISTERED",
        label: "Registered",
      },
    ],
  },
  {
    id: "HISTORY",
    label: "History",
  },
];

export default function ContestFilters({ current }) {
  const router = useRouter();

  function handleFilter(status) {
    router.push(`/contests?status=${status}`);
  }
  return (
    <nav className="p-xs pt-sm flex flex-1 flex-col gap-y-1">
      {FILTERS.map((item) => (
        <div key={item.id}>
          {/* Parent row */}
          <button
            onClick={() => (item.children ? handleFilter("ONGOING") : handleFilter(item.id))}
            className={`px-sm py-xs2 flex w-full items-center gap-2 rounded text-left transition-colors ${
              current === item.id ? "text-text font-semibold" : "text-sec-text hover:text-text"
            }`}
          >
            {/* Checkbox — only on "Contests" parent */}
            {item.children && (
              <span
                className={`border-text inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                  current === item.id || item.children.some((c) => c.id === current)
                    ? "bg-text"
                    : "bg-white"
                }`}
              >
                {(current === item.id || item.children.some((c) => c.id === current)) && (
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-white">
                    <rect x="1" y="4" width="8" height="2" rx="1" />
                  </svg>
                )}
              </span>
            )}
            <span className="font-primary text-sm">{item.label}</span>
          </button>

          {/* Children with tree lines */}
          {item.children && (
            <div className="relative mt-0.5 ml-[22px] flex flex-col">
              {/* Vertical line */}
              <span className="bg-border absolute top-0 bottom-3 left-0 w-px" />

              {item.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleFilter(child.id)}
                  className={`pr-sm py-xs2 relative flex w-full items-center rounded-r pl-4 text-left transition-colors ${
                    current === child.id
                      ? "text-text font-semibold"
                      : "text-sec-text hover:text-text"
                  }`}
                >
                  {/* Horizontal branch */}
                  <span className="border-border absolute top-1/2 left-0 w-3 -translate-y-1/2 border-t" />
                  <span className="font-primary text-sm">{child.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

{
  /*onClick={() =>
         item.children
          ? handleFilter("ONGOING")
         :  handleFilter(item.id)
         }*/
}
