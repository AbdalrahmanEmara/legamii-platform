"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Btn1 from "@/components/ui/Btn1";

const roles = [
  {
    key: "student",
    title: "Student",
    description: "Participate in classroom activities",
    image: "/images/roles/student.png",
  },
  {
    key: "teacher",
    title: "Teacher",
    description: "Create contests, monitor and assess students",
    image: "/images/roles/teacher.png",
  },
  {
    key: "administrator",
    title: "Administrator",
    description: "Oversees school operations",
    image: "/images/roles/administrator.png",
  },
];

export default function RoleContent() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleCardClick = (role) => {
    if (role === "administrator") {
      toast("Administrator, coming soon", {
        icon: "🚧",
        style: {
          background: "#1a1a2e",
          color: "#fff",
          border: "1px solid var(--color-border, #e2e8f0)",
          borderRadius: "8px",
          padding: "12px 24px",
          fontWeight: 600,
        },
        duration: 3000,
      });
      return;
    }
    setSelected(role);
  };

  const handleNext = () => {
    if (!selected) return;
    router.push(`/auth/signup?role=${selected}`);
  };

  return (
    <div className="px-xl py-md bg-el-bg flex flex-col items-center gap-8 rounded-b-lg">
      <p className="text-text font-primary text-3xl leading-9 font-bold uppercase text-center">
        WHAT DESCRIBES YOU MOST?
      </p>

      <div className="flex w-full flex-col gap-8">
        {roles.map((role) => (
          <button
            key={role.key}
            type="button"
            onClick={() => handleCardClick(role.key)}
            className={`p-6 bg-el-bg rounded-lg outline outline-1 outline-offset-[-1px] flex items-center gap-6 w-full text-left cursor-pointer hover:opacity-80 transition-all ${
              selected === role.key
                ? "outline-primary-500"
                : "shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] outline-border"
            }`}
          >
            <Image
              src={role.image}
              alt={role.title}
              width={48}
              height={48}
              className="size-12"
            />
            <div>
              <p className="text-text text-xl font-medium font-secondary leading-7">
                {role.title}
              </p>
              <p className="text-sec-text text-lg font-normal font-secondary leading-6">
                {role.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Btn1
        title="NEXT"
        disabled={!selected}
        onClick={handleNext}
        className="w-full"
      />
    </div>
  );
}
