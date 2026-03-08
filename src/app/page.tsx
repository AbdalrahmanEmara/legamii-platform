"use client";

import Btn1 from "@/components/ui/Btn1";
import { useRouter } from "next/navigation";

export default function DesignSystemTest() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/signin");
  };
  return (
    <div className="bg-el-bg p-base min-h-screen">
      {/* Typography */}
      <h1 className="title-1 mb-sm text-primary-500 uppercase">Legamii</h1>
      <Btn1 title={"Sign In"} className="mb-sm text-white" onClick={handleClick} />
      <h2 className="heading-h2 text-text mb-sm">Heading H2 — Inter</h2>
      <p className="body-2 text-sec-text mb-sm">Body 2 — Inter. Secondary text color.</p>
      <span className="label-1 text-primary-500">Label 1 — Dogica Pixel</span>

      {/* Colors */}
      <div className="gap-xs mt-base flex">
        <div className="w-size-5xl h-size-5xl bg-primary-500 rounded-lg" />
        <div className="w-size-5xl h-size-5xl bg-secondary-500 rounded-lg" />
        <div className="w-size-5xl h-size-5xl rounded-lg bg-red-500" />
        <div className="w-size-5xl h-size-5xl rounded-lg bg-green-500" />
        <div className="w-size-5xl h-size-5xl rounded-lg bg-yellow-500" />
        <div className="w-size-5xl h-size-5xl rounded-lg bg-neutral-800" />
      </div>

      {/* Semantic tokens */}
      <div className="mt-base p-sm border-border bg-el-bg rounded-2xl border">
        <p className="body-3 text-text">This box uses semantic tokens.</p>
        <p className="body-3 text-sec-text">Secondary text color.</p>
      </div>

      {/* Dark mode toggle — just to visually test */}
      <button
        className="mt-base px-sm py-xs bg-primary-500 label-2 rounded-lg text-white"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        Toggle Dark Mode
      </button>
    </div>
  );
}
