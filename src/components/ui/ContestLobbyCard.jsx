"use client";

import React from "react";
import ReusableWindow from "./ReusableWindow";
import ContestFilters from "./ContestFilters";
import Button from "./Button";
import { BookOpen, FlaskConical, Cpu, Calendar, Clock, Hourglass } from "lucide-react";

export default function ContestLobbyCard() {
  return (
    <ReusableWindow title="CONTESTS_CHALLENGES.SYS" className="flex-1 w-full max-w-[950px] ">
      <div className="flex h-full bg-white rounded-bl-lg rounded-br-lg">
        {/* Left Sidebar */}
        <div className="w-[240px] border-r border-text flex flex-col shrink-0">
          <div className="border-b border-text py-4 px-4 text-center font-primary text-[15px] font-bold">
            Filter
          </div>
          <ContestFilters current="ONGOING" />
        </div>

        {/* Right Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-text py-4 px-6 bg-white">
            <h2 className="font-primary text-[22px] font-bold uppercase tracking-wide text-text">CONTEST LOBBY</h2>
            <button className="font-secondary text-[14px] font-bold text-text hover:underline flex items-center">
              Back to Contests &gt;
            </button>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-1 overflow-y-auto">
            {/* Top Info */}
            <div className="flex justify-between items-start">
              <div className="flex gap-6">
                {/* Icon */}
                <div className="w-[110px] h-[110px] bg-secondary-50 flex items-center justify-center rounded-md border border-secondary-200">
                  <FlaskConical className="w-[48px] h-[48px] text-secondary-500" strokeWidth={1.5} />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 justify-center">
                  <div className="bg-green-600 text-white font-primary text-[11px] px-2 py-1 w-fit rounded-sm uppercase border border-black shadow-[1px_1px_0px_0px_#000]">
                    Live 00:29
                  </div>
                  <h1 className="font-primary text-[24px] font-bold uppercase mt-1 text-text">
                    SCIENCE FAIR PREP
                  </h1>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-neutral-100 text-sec-text text-[12px] px-3 py-1 font-secondary rounded-sm">School Contest</span>
                    <span className="bg-neutral-100 text-sec-text text-[12px] px-3 py-1 font-secondary rounded-sm">Grade 7</span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="border-2 border-[#EAB308] text-[#EAB308] font-primary text-[14px] font-bold px-4 py-2 -rotate-3 bg-white mt-4 mr-2">
                INTERMEDIATE
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col mt-8">
              <h3 className="font-primary text-[15px] font-bold mb-4 text-text">Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <DetailBox icon={<BookOpen className="w-6 h-6 text-text" strokeWidth={1.5} />} title="Science" subtitle="Subject" />
                <DetailBox icon={<FlaskConical className="w-6 h-6 text-text" strokeWidth={1.5} />} title="Physics, Scientific Thinking" subtitle="Skills" />
                <DetailBox icon={<Cpu className="w-6 h-6 text-text" strokeWidth={1.5} />} title="Energy Transfer" subtitle="Topic" />
              </div>
            </div>

            {/* Schedule Section */}
            <div className="flex flex-col mt-8">
              <h3 className="font-primary text-[15px] font-bold mb-4 text-text">Schedule</h3>
              <div className="grid grid-cols-3 gap-4">
                <DetailBox icon={<Calendar className="w-6 h-6 text-text" strokeWidth={1.5} />} title="Monday, Feb 2" subtitle="Start Date" />
                <DetailBox icon={<Clock className="w-6 h-6 text-text" strokeWidth={1.5} />} title="08:00 PM" subtitle="Start Time (EGY)" />
                <DetailBox icon={<Hourglass className="w-6 h-6 text-text" strokeWidth={1.5} />} title="30 Min" subtitle="Duration" />
              </div>
            </div>

            {/* Friends Joining Section */}
            <div className="flex flex-col my-8">
              <h3 className="font-primary text-[15px] font-bold mb-3 text-text">Friends Joining</h3>
              <div className="flex -space-x-3">
                <img src="/avatars/a1.png" alt="Friend 1" className="w-12 h-12 rounded-full border-[1.5px] border-text object-cover bg-neutral-200" />
                <img src="/avatars/a2.png" alt="Friend 2" className="w-12 h-12 rounded-full border-[1.5px] border-text object-cover bg-neutral-200" />
                <img src="/avatars/a3.png" alt="Friend 3" className="w-12 h-12 rounded-full border-[1.5px] border-text object-cover bg-neutral-200" />
              </div>
            </div>

            <div className="font-primary font-bold text-[14px] text-text">
              Participating Bonus: <span className="text-primary-500">+240xp</span>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end mt-auto pb-4 pt-12">
              <Button className="font-primary text-white text-[16px]">
                JOIN NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ReusableWindow>
  );
}

function DetailBox({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 border-[1.5px] border-text bg-white px-4 py-3 shadow-[2px_3px_0px_0px_rgba(0,0,0,1.00)] rounded-sm min-h-[76px]">
      <div className="shrink-0">
        {icon}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span className="font-secondary font-bold text-[14px] text-text truncate w-full" title={title}>{title}</span>
        <span className="font-secondary text-[11px] text-sec-text">{subtitle}</span>
      </div>
    </div>
  );
}
