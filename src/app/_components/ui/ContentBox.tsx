import React from "react";

interface ContentBoxProps {
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
  className?: string;
}

// const ContentBox: React.FC<ContentBoxProps> = ({ width, height, children, className = "" }) => {
//   return (
//     <div
//       className={`border-foreground bg-card rounded-xl border-2 bg-white p-6 shadow-[2px_2px_0px_0px_hsl(var(--foreground))] ${className}`}
//       style={{
//         width: typeof width === "number" ? `${width}px` : width,
//         height: typeof height === "number" ? `${height}px` : height,
//       }}
//     >
//       {/**Start */}
//       <div className="bg-Primary-50 outline-Border inline-flex items-center justify-between self-stretch overflow-hidden rounded-tl-xl rounded-tr-xl p-4 outline outline-1 outline-offset-[-1px]">
//         <div className="flex items-center justify-start gap-4">
//           <div className="text-Text justify-start font-['Dogica_Pixel'] text-sm leading-5 font-normal">
//             WELCOME.SYS
//           </div>
//         </div>
//         <div className="flex items-center justify-start gap-2">
//           <div className="flex h-4 w-4 items-end justify-center gap-2.5 overflow-hidden px-px py-0.5">
//             <div className="outline-Text h-0 flex-1 outline outline-1 outline-offset-[-0.50px]" />
//           </div>
//           <div className="relative h-4 w-4 overflow-hidden">
//             <div className="outline-Text absolute top-[2px] left-[2px] h-3 w-3 outline outline-1 outline-offset-[-0.50px]" />
//           </div>
//           <div className="relative h-4 w-4 overflow-hidden">
//             <div className="outline-Text absolute top-[2px] left-[2px] h-3 w-3 outline outline-1 outline-offset-[-0.50px]" />
//             <div className="outline-Text absolute top-[2px] left-[2px] h-3 w-3 outline outline-1 outline-offset-[-0.50px]" />
//           </div>
//         </div>
//       </div>
//       {/**End */}
//       {children}
//     </div>
//   );
// };

// export default ContentBox;
const ContentBox: React.FC<ContentBoxProps> = ({ width, height, children, className = "" }) => {
  return (
    <div
      className={`border-foreground bg-card /* 🔥 important for clipping */ overflow-hidden rounded rounded-xl border-2 bg-white shadow-[2px_2px_0px_0px_hsl(var(--foreground))] ${className} `}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {/* ================= HEADER ================= */}
      <div className="/* 🔥 makes it fill width */ bg-Primary-50 outline-Border flex w-full items-center justify-between p-4 outline outline-1 outline-offset-[-1px]">
        <div className="flex items-center gap-4">
          <div className="text-Text font-['Dogica_Pixel'] text-sm leading-5">WELCOME.SYS</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-end justify-center px-px py-0.5">
            <div className="outline-Text h-0 flex-1 outline outline-1 outline-offset-[-0.5px]" />
          </div>
          <div className="relative h-4 w-4">
            <div className="outline-Text absolute top-[2px] left-[2px] h-3 w-3 outline outline-1 outline-offset-[-0.5px]" />
          </div>
          <div className="relative h-4 w-4">
            <div className="outline-Text absolute top-[2px] left-[2px] h-3 w-3 outline outline-1 outline-offset-[-0.5px]" />
            <div className="outline-Text absolute top-[2px] left-[2px] h-3 w-3 outline outline-1 outline-offset-[-0.5px]" />
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6">{children}</div>
    </div>
  );
};
export default ContentBox;
