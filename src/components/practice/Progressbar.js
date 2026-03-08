// function ProgressBar({ current, total }) {
//   const pct = (current / total) * 100;
//   return (
//     <div className="px-6 pb-5">
//       <div className="relative mb-1.5">
//         <div
//           className="absolute -top-2 w-3 h-3 bg-primary-500 rounded-sm shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all duration-500"
//           style={{ left: `calc(${pct}% - 6px)` }}
//         />
//         <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             // className="h-full bg-gradient-to-r from-primary-500 to-pink-500 rounded-full transition-all duration-500"
//             className="h-full from-primary-500"
//             style={{ width: `${pct}%` }}
//           />
//         </div>
//       </div>
//       <div className="font-mono text-xs text-gray-400">{current}/{total}</div>
//     </div>
//   );
// }
//  export default ProgressBar;

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className="pb-5">
      <div className="relative mb-1.5">
        {/* Square thumb */}
        <div
          className="bg-primary-500 absolute -top-2 h-3 w-3 rounded-sm shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all duration-500"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
        {/* Track */}
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
          {/* Fill */}
          <div
            className="bg-primary-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="font-mono text-xs text-gray-400">
        {current}/{total}
      </div>
    </div>
  );
}

export default ProgressBar;
