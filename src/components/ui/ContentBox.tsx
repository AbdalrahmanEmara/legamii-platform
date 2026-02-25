import React from "react";

interface ContentBoxProps {
  width?: string | number;
  height?: string | number;
  children: React.ReactNode;
  className?: string;
}

const ContentBox: React.FC<ContentBoxProps> = ({ width, height, children, className = "" }) => {
  return (
    <div
      className={`flex  flex-col items-start gap-[var(--spacing-2xl)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-el-bg)] p-[var(--spacing-base)] shadow-[2px_3px_4px_0_#000] ${className} `}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {/* ================= CONTENT ================= */}
      <div className="p-6">{children}</div>
    </div>
  );
};
export default ContentBox;

// import React from "react";

// interface ContentBoxProps {
//   width: string | number;   // 👈 make width REQUIRED
//   height?: string | number; // 👈 height optional
//   children: React.ReactNode;
//   className?: string;
// }

// const ContentBox: React.FC<ContentBoxProps> = ({
//   width,
//   height,
//   children,
//   className = "",
// }) => {
//   return (
//     <div
//       className={`flex flex-col flex-none
//       items-start gap-[var(--spacing-2xl)]
//       rounded-[var(--radius-lg)]
//       border border-[var(--color-border)]
//       bg-[var(--color-el-bg)]
//       p-[var(--spacing-base)]
//       shadow-[2px_3px_4px_0_#000]
//       ${className}`}
//       style={{
//         width: typeof width === "number" ? `${width}px` : width,
//         height: height
//           ? typeof height === "number"
//             ? `${height}px`
//             : height
//           : "auto",
//       }}
//     >
//       <div className="w-full">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ContentBox;