'use client';

import { useRef, useState } from "react";
import Btn1 from "../ui/Btn1";

export default function OtpInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);

  const handleChange = (el, index) => {
    if (isNaN(el.value)) return;

    const newOtp = [...otp];
    newOtp[index] = el.value.substring(el.value.length - 1);
    setOtp(newOtp);

    // Move focus to the next input
    if (el.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Trigger callback if the OTP is complete
    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").split("");
    if (data.length === length) {
      setOtp(data);
      inputRefs.current[length - 1].focus();
      onComplete(data.join(""));
    }
  }

  return (
    <div>
      <div className="flex justify-center gap-xs2">
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
            className={`w-[64px] placeholder:font-montserrat placeholder:text-neutral-400 text-lg font-bold font-secondary leading-6 text-center border border-border p-sm rounded-lg text-white ${data ? "bg-primary-500 shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] outline-1 -outline-offset-1 outline-neutral-800" : "bg-neutral-100"}`} />
        ))}
      </div>
      <p className="flex justify-end mt-4 text-primary-600 text-sm font-normal font-secondary leading-5">Resend code: after {timer}s</p>
      <Btn1 title={'continue'} className={'w-full mt-8'}/>
    </div>
  )
}