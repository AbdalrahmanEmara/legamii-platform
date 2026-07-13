'use client';

import ContestFilters from "../ui/ContestFilters";
import CustomScroll from "../ui/CustomScroll";
import { TextAlignJustify } from "lucide-react";
import ContestList from "./ContestList";
import { useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import RegistrationPopup from "../ui/RegistrationPopup";

export default function MainContestPage({ status, contestsData }) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className={`${showFilter ? 'block' : 'hidden 2xl:block'} border-text bg-el-bg flex w-full md:w-[240px] shrink-0 flex-col border-r`}>
        <div className="border-border py-xs2 px-base flex items-center gap-base self-stretch border font-bold">
          <button onClick={() => setShowFilter(false)}>
            <CloseIcon size={20} className="font-bold" />
          </button>
          <span className="heading-h7 text-text font-primary font-normal">Filter</span>
        </div>

        <ContestFilters current={status} />
      </aside>

      <div className={`${!showFilter ? 'flex' : 'hidden md:flex'} flex flex-1 flex-col overflow-hidden bg-neutral-50`}>
        <div className="border-text p-base z-10 flex items-center justify-between border-b bg-white">
          <div className="flex gap-base">
            <button onClick={() => setShowFilter((showFilter) => !showFilter)} className={`${showFilter ? "hidden" : 'block 2xl:hidden'}`}>
              <TextAlignJustify />
            </button>
            <h1 className="text-base md:text-xl 2xl:text-2xl 2xl:leading-8 font-primary font-bold leading-6 text-text m-0 uppercase">Contests</h1>
          </div>
          <div className="hidden 2xl:flex gap-xs items-center">
            <button className="border-secondary-500 px-sm py-xs2 font-primary text-secondary-500 rounded border-2 text-sm font-bold shadow-[2px_2px_0px_0px_#0059ff] transition-transform hover:-translate-y-0.5">
              {status}
            </button>
          </div>
        </div>
        <CustomScroll className="p-base">
          {/* <Suspense fallback={<ContestListSkeleton />}>
              <ContestListWrapper searchParams={searchParams} />
            </Suspense> */}
          <RegistrationPopup />
          <ContestList contestsData={contestsData} />
        </CustomScroll>
      </div>
    </div>
  );
}