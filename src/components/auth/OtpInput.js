"use client";

import { useRef, useState } from "react";
import Btn1 from "../ui/Btn1";
import { useRouter } from "next/navigation";

export default function OtpInput({ length = 6, onComplete, email }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  // const [timer, setTimer] = useState(60);

  const handleChange = (el, index) => {
    if (isNaN(el.value)) return;

    const newOtp = [...otp];
    newOtp[index] = el.value.substring(el.value.length - 1);
    setOtp(newOtp);

    // Move focus to the next input
    if (el.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOnClick = () => {
    // Trigger callback if the OTP is complete
    if (otp.join("").length === length) {
      onComplete(email, otp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").split("");
    if (data.length === length) {
      setOtp(data);
      inputRefs.current[length - 1].focus();
      onComplete(email, data.join(""));
    }
  };

  return (
    <div>
      <div className="gap-xs2 flex justify-center">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            inputMode="numeric"
            value={data}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            placeholder="-"
            className={`placeholder:font-montserrat font-secondary focus:border-border p-sm w-[64px] rounded-lg border text-center text-lg leading-6 font-bold text-white caret-transparent placeholder:text-neutral-400 focus:outline-none ${data ? "bg-primary-500 shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] outline-1 -outline-offset-1 outline-neutral-800" : "bg-neutral-100"}`}
          />
        ))}
      </div>
      <p className="text-primary-600 font-secondary mt-4 flex justify-end text-sm leading-5 font-normal">
        Otp expires in 60min
      </p>
      <Btn1
        title={"continue"}
        className={"mt-8 w-full"}
        onClick={handleOnClick}
        disabled={!otp.every((d) => d)}
      />
    </div>
  );
}
