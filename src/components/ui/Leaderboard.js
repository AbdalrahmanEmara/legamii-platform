"use client";
import Image from "next/image";
import ReusableWindow from "./ReusableWindow";
import CustomScroll from "./CustomScroll";

export default function Leaderboard({ students = [] }) {
  return (
    <ReusableWindow
      className="flex h-[1004px] w-[413px] flex-col items-start items-stretch"
      title="PARTICIPANT_LIST.sys"
    >
      <CustomScroll>
        {students.map((user, index) => (
          <div
            key={user.id}
            className="px-sm py-base gap-base flex self-stretch"
          >
            <div className="label-1 w-10 font-bold">#{index + 1}</div>

            <div className="border-border relative h-[50.304px] w-[50.304px] self-stretch">
              <Image
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <div className="gap-xxs flex flex-col items-start justify-center">
              <span className="label-1 font-bold">{`${user.firstName} ${user.lastName}`}</span>
              <span className="body-2">Lvl {user.level}</span>
            </div>
          </div>
        ))}
      </CustomScroll>
    </ReusableWindow>
  );
}