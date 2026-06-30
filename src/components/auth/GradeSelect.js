"use client";

import { useEffect, useId, useRef, useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";

export default function GradeSelect({
  grades,
  label = "Grade",
  placeholder = "Select your grade",
  value,
  onChange,
}) {
  const id = useId();
  const wrapRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleSelect = (v) => {
    onChange?.(v);
    setOpen(false);
  };

  const selectedGrade = grades.find((g) => g.id === value);

  return (
    <div ref={wrapRef} className="gap-xs2 hide-scrollbar flex flex-col">
      <label
        htmlFor={id}
        className="text-text font-primary text-sm leading-5 font-normal uppercase"
      >
        {label}
      </label>

      <button
        id={id}
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="text-sec-text font-secondary bg-el-bg relative h-13 w-full rounded border border-neutral-400 px-4 pr-12 text-left text-sm"
      >
        {value ? (
          <span className="text-text">{selectedGrade?.name}</span>
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        )}
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <div className="bg-sec-el border border-neutral-300 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <ul className="max-h-72 overflow-auto py-3">
            {grades.map((grade) => {
              const isSelected = grade.id === value; // ✅ fixed

              return (
                <li key={grade.id} className="px-4">
                  <button
                    type="button"
                    onClick={() => handleSelect(grade.id)}
                    className={[
                      "w-full text-left px-3 py-4 rounded",
                      "font-secondary text-sm text-neutral-700",
                      "border border-transparent",
                      "hover:bg-el-bg hover:border hover:border-neutral-700",
                      "hover:shadow-[2px_2px_4px_1px_rgba(0,0,0,0.76)]",
                      isSelected ? "text-text font-medium" : "",
                    ].join(" ")}
                  >
                    {grade.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}