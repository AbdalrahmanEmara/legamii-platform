"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import Btn1 from "../ui/Btn1";
import { Check, Eye, EyeClosed, X } from "lucide-react";

const requirements = [
  { label: "Minimum 8 characters", test: (p) => p.length >= 8 },
  { label: "At Least One Capital Letter", test: (p) => /[A-Z]/.test(p) },
  { label: "At least one number", test: (p) => /[0-9]/.test(p) },
  { label: "At least one special character (! @ # $ % &)", test: (p) => /[!@#$%&]/.test(p) },
];

export default function CreateNewPassForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const confirmedPassError =
    confirmPassword.length > 0 && password !== confirmPassword ? "Passwords do not match" : null;
  const allRequirementsPassed = requirements.every(({ test }) => test(password));

  return (
    <>
      <form>
        <FormInput
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          className={"mb-base"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endIcon={
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="">
              {showPassword ? (
                <Eye className="text-primary-500 h-5 w-5" />
              ) : (
                <EyeClosed className="text-sec-text h-5 w-5" />
              )}
            </button>
          }
        />
        <FormInput
          label={"Confirm new password"}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmedPassError}
          endIcon={
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="">
              {showPassword ? (
                <Eye className="text-primary-500 h-5 w-5" />
              ) : (
                <EyeClosed className="text-sec-text h-5 w-5" />
              )}
            </button>
          }
        />
        <Btn1
          title={"change password"}
          className={"mt-md w-full disabled:cursor-not-allowed"}
          disabled={!allRequirementsPassed || !confirmPassword.length || !!confirmedPassError}
        />
      </form>
      <div>
        <p className="text-text font-secondary text-lg leading-6 font-medium">
          Password requirements:
        </p>
        <ul>
          {requirements.map(({ label, test }) => {
            const passed = password.length > 0 && test(password);
            const failed = password.length > 0 && !test(password);

            return (
              <li
                key={label}
                className={`font-secondary text-sm leading-5 font-normal ${passed ? "text-text" : failed ? "text-red-500" : "text-sec-text"}`}
              >
                <span
                  className={`mr-3 text-2xl ${passed ? "text-primary-500" : failed ? "text-red-500" : "text-sec-text"}`}
                >
                  {failed ? (
                    <X className="inline-block h-5 w-5" strokeWidth={3} />
                  ) : (
                    <Check className="inline-block h-5 w-5" strokeWidth={3} />
                  )}
                </span>{" "}
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
