"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import ArrowIcon from "../icons/ArrowIcon";

export default function GradeSelect({
  label = "GRADE",
  placeholder = "Select your grade",
  options = ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"],
  value,
  onChange,
}) {
  const id = useId();
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(null);
  const selected = isControlled ? value : internalValue;

  const selectedIndex = useMemo(() => {
    if (!selected) return -1;
    return options.findIndex((o) => o === selected);
  }, [options, selected]);

  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);

  // Close on outside click
  useEffect(() => {
    function onDocMouseDown(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // When opening, sync activeIndex and focus list
  useEffect(() => {
    if (!open) return;
    const next = selectedIndex >= 0 ? selectedIndex : 0;
    setActiveIndex(next);
    // focus the list for keyboard nav
    requestAnimationFrame(() => listRef.current?.focus());
  }, [open, selectedIndex]);

  function commit(nextValue) {
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }

  function onButtonKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      requestAnimationFrame(() => buttonRef.current?.focus());
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      commit(options[activeIndex]);
      return;
    }

    // Typeahead (optional, simple)
    if (e.key.length === 1) {
      const ch = e.key.toLowerCase();
      const start = activeIndex + 1;
      const rotated = [...options.slice(start), ...options.slice(0, start)];
      const found = rotated.findIndex((o) => o.toLowerCase().startsWith(ch));
      if (found !== -1) {
        const realIndex = (start + found) % options.length;
        setActiveIndex(realIndex);
      }
    }
  }

  return (
    <div ref={wrapRef} className="w-full max-w-[520px]">
      <label htmlFor={id} className="mb-2 block text-xs tracking-widest text-neutral-600">
        {label}
      </label>

      <div className="relative">
        {/* Trigger */}
        <button
          ref={buttonRef}
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onButtonKeyDown}
          className="h-12 w-full border border-neutral-300 bg-white px-4 pr-11 text-left text-sm text-neutral-900 outline-none focus:border-neutral-500"
        >
          <span className={selected ? "text-neutral-900" : "text-neutral-400"}>
            {selected ?? placeholder}
          </span>

          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">
            <ArrowIcon className="h-5 w-5" />
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 left-0 z-50 mt-2 border border-neutral-300 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <ul
              ref={listRef}
              tabIndex={0}
              role="listbox"
              aria-label={`${label} options`}
              onKeyDown={onListKeyDown}
              className="max-h-72 overflow-auto py-2 outline-none"
            >
              {options.map((opt, idx) => {
                const isSelected = opt === selected;
                const isActive = idx === activeIndex;

                return (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseDown={(e) => e.preventDefault()} // prevent focus loss
                    onClick={() => commit(opt)}
                    className={[
                      "mx-3 my-1 cursor-pointer px-3 py-3 text-sm select-none",
                      "text-neutral-800",
                      isActive
                        ? "border border-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                        : "border border-transparent",
                      isSelected && !isActive ? "font-medium" : "",
                    ].join(" ")}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
