"use client";

import React from "react";
import ReusableWindow from "./ReusableWindow";
import ContestFilters from "./ContestFilters";
import Button from "./Button";
import { BookOpen, FlaskConical, Cpu, Calendar, Clock, Hourglass } from "lucide-react";

export default function ContestLobbyCard() {
  return (
    <ReusableWindow title="CONTESTS_CHALLENGES.SYS" className="w-full max-w-[950px] flex-1">
      <div className="flex h-full rounded-br-lg rounded-bl-lg bg-white">
        {/* Left Sidebar */}
        <div className="border-text flex w-[240px] shrink-0 flex-col border-r">
          <div className="border-text font-primary border-b px-4 py-4 text-center text-[15px] font-bold">
            Filter
          </div>
          <ContestFilters current="ONGOING" />
        </div>

        {/* Right Area */}
        <div className="flex flex-1 flex-col bg-white">
          {/* Header */}
          <div className="border-text flex items-center justify-between border-b bg-white px-6 py-4">
            <h2 className="font-primary text-text text-[22px] font-bold tracking-wide uppercase">
              CONTEST LOBBY
            </h2>
            <button className="font-secondary text-text flex items-center text-[14px] font-bold hover:underline">
              Back to Contests &gt;
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col overflow-y-auto p-8">
            {/* Top Info */}
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                {/* Icon */}
                <div className="bg-secondary-50 border-secondary-200 flex h-[110px] w-[110px] items-center justify-center rounded-md border">
                  <FlaskConical
                    className="text-secondary-500 h-[48px] w-[48px]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center gap-1">
                  <div className="font-primary w-fit rounded-sm border border-black bg-green-600 px-2 py-1 text-[11px] text-white uppercase shadow-[1px_1px_0px_0px_#000]">
                    Live 00:29
                  </div>
                  <h1 className="font-primary text-text mt-1 text-[24px] font-bold uppercase">
                    SCIENCE FAIR PREP
                  </h1>
                  <div className="mt-1 flex gap-2">
                    <span className="text-sec-text font-secondary rounded-sm bg-neutral-100 px-3 py-1 text-[12px]">
                      School Contest
                    </span>
                    <span className="text-sec-text font-secondary rounded-sm bg-neutral-100 px-3 py-1 text-[12px]">
                      Grade 7
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="font-primary mt-4 mr-2 -rotate-3 border-2 border-[#EAB308] bg-white px-4 py-2 text-[14px] font-bold text-[#EAB308]">
                INTERMEDIATE
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-8 flex flex-col">
              <h3 className="font-primary text-text mb-4 text-[15px] font-bold">Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <DetailBox
                  icon={<BookOpen className="text-text h-6 w-6" strokeWidth={1.5} />}
                  title="Science"
                  subtitle="Subject"
                />
                <DetailBox
                  icon={<FlaskConical className="text-text h-6 w-6" strokeWidth={1.5} />}
                  title="Physics, Scientific Thinking"
                  subtitle="Skills"
                />
                <DetailBox
                  icon={<Cpu className="text-text h-6 w-6" strokeWidth={1.5} />}
                  title="Energy Transfer"
                  subtitle="Topic"
                />
              </div>
            </div>

            {/* Schedule Section */}
            <div className="mt-8 flex flex-col">
              <h3 className="font-primary text-text mb-4 text-[15px] font-bold">Schedule</h3>
              <div className="grid grid-cols-3 gap-4">
                <DetailBox
                  icon={<Calendar className="text-text h-6 w-6" strokeWidth={1.5} />}
                  title="Monday, Feb 2"
                  subtitle="Start Date"
                />
                <DetailBox
                  icon={<Clock className="text-text h-6 w-6" strokeWidth={1.5} />}
                  title="08:00 PM"
                  subtitle="Start Time (EGY)"
                />
                <DetailBox
                  icon={<Hourglass className="text-text h-6 w-6" strokeWidth={1.5} />}
                  title="30 Min"
                  subtitle="Duration"
                />
              </div>
            </div>

            {/* Friends Joining Section */}
            <div className="my-8 flex flex-col">
              <h3 className="font-primary text-text mb-3 text-[15px] font-bold">Friends Joining</h3>
              <div className="flex -space-x-3">
                <img
                  src="/avatars/a1.png"
                  alt="Friend 1"
                  className="border-text h-12 w-12 rounded-full border-[1.5px] bg-neutral-200 object-cover"
                />
                <img
                  src="/avatars/a2.png"
                  alt="Friend 2"
                  className="border-text h-12 w-12 rounded-full border-[1.5px] bg-neutral-200 object-cover"
                />
                <img
                  src="/avatars/a3.png"
                  alt="Friend 3"
                  className="border-text h-12 w-12 rounded-full border-[1.5px] bg-neutral-200 object-cover"
                />
              </div>
            </div>

            <div className="font-primary text-text text-[14px] font-bold">
              Participating Bonus: <span className="text-primary-500">+240xp</span>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto flex items-end justify-between pt-12 pb-4">
              <Button className="font-primary text-[16px] text-white">JOIN NOW</Button>
            </div>
          </div>
        </div>
      </div>
    </ReusableWindow>
  );
}

function DetailBox({ icon, title, subtitle }) {
  return (
    <div className="border-text flex min-h-[76px] items-center gap-3 rounded-sm border-[1.5px] bg-white px-4 py-3 shadow-[2px_3px_0px_0px_rgba(0,0,0,1.00)]">
      <div className="shrink-0">{icon}</div>
      <div className="flex min-w-0 flex-col justify-center">
        <span
          className="font-secondary text-text w-full truncate text-[14px] font-bold"
          title={title}
        >
          {title}
        </span>
        <span className="font-secondary text-sec-text text-[11px]">{subtitle}</span>
      </div>
    </div>
  );
}
